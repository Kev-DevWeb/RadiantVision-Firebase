from flask import Flask, url_for, request
from flask import Flask, render_template, jsonify, request
import joblib
from bs4 import BeautifulSoup as bs
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)

@app.route('/home')
def index():
    js_file_url = url_for('static', filename='js/firebase.js')
    navbar_url = url_for('login')
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/vinculacion')
def vinculacion():
    return render_template('vinculation.html')

@app.route('/perfil', methods=['GET', 'POST'])
def perfil():
    if request.method == 'POST':
        # Código para extraer datos del sitio web y realizar la predicción
        url = request.form['linkBeforeInput']
        
        options = webdriver.FirefoxOptions()
        ##options.add_argument('--ignore-certificate-errors')  # Opcional: para ignorar errores de certificado SSL si es necesario

        # Configurar el tiempo de espera máximo antes de que se genere un error de timeout
        timeout = 60  # Tiempo en segundos
        options.add_argument('--disable-dev-shm-usage')  # Deshabilitar el uso de la memoria compartida
        options.add_argument(f'--page-load-timeout={timeout}')

        # Iniciar el navegador con las opciones configuradas
        browser = webdriver.Firefox(options=options)
        
        
        try:
            browser.get(url)
            browser.implicitly_wait(30)
        except:
            pass
        
        time.sleep(15)

        html = browser.page_source
        soup = bs(html, 'lxml')

        
        browser.close()
        browser.quit()
        
        ##---------------------------------------------------------------Extraer Datos del HTML----------------------------------------##

        ##Extraccion de datos de IDENTIFICACION
        player = soup.find('span', {'class': 'trn-ign__username'}).text.strip()
        player
        tag = soup.find('span', {'class': 'trn-ign__discriminator'}).text.strip()
        tag

        rankList = soup.find_all('div', {'class': 'rating-entry'})
        rankList

        if rankList:
            currentRank = rankList[0].find('div', {'class': 'value'}).text
            peakRank = rankList[1].find('div', {'class': 'value'}).text
        else:
            print("La lista de Rangos esta vacia")

        ##Extraccion de datos de PARTIDAS
        matchesList = soup.find_all('text', {'fill': '#fff'})

        if rankList:
            numberWins = matchesList[0].text
            numberLose = matchesList[1].text
        else:
            print("La lista V/D esta vacia")

        ##Extraccion de datos de WINRATE Y COMBATE
        statList = soup.find_all('div', {'class': 'numbers'})

        if statList:
            winrate = statList[3].find('span', {'class': 'value'}).text[:-1]
            avgCS = statList[10].find('span', {'class': 'value'}).text
            kdaRatio = statList[11].find('span', {'class': 'value'}).text
            killsPerRound = statList[12].find('span', {'class': 'value'}).text
            avgDmgRound = statList[0].find('span', {'class': 'value'}).text
            kills = statList[7].find('span', {'class': 'value'}).text
            deadths = statList[8].find('span', {'class': 'value'}).text
            assist = statList[9].find('span', {'class': 'value'}).text
        else:
            print("La lista de stats esta vacia")

        ##Extraccion de datos de PRECISION
        accuracyList = soup.find_all('td', {'class': 'stat'})

        if accuracyList:  
            headshots = accuracyList[0].find('span', {'class': 'stat__value'}).text[:-1]
            boddyshots = accuracyList[2].find('span', {'class': 'stat__value'}).text[:-1]
            legsshots = accuracyList[4].find('span', {'class': 'stat__value'}).text[:-1]
        else:
            print("La lista accuracyList está vacía")
        
        ##---------------------------------------------------------------LLenado del Dataframe----------------------------------------##
        
        playerData = pd.DataFrame([{'avgCS': avgCS, 'KDArat': kdaRatio, 'kpr': killsPerRound, 
                                    'avgDmgRound': avgDmgRound,'headPercent': headshots, 
                                    'boddyPercent': boddyshots, 'legsPercent': legsshots}])
        
        
        #lectura del modelo
        model_path='C:/Users/Joseph/Documents/GitHub/RadiantVision-Firebase/app/model_jb.joblib'
        clf=joblib.load(model_path)

        # Realizar la predicción
        prediction = clf.predict(playerData)
        print(prediction)
        # Convertir la predicción a un formato JSON
        prediction_json = jsonify({'prediction': prediction.tolist()})
        
        # Devolver la predicción como parte del contexto del renderizado de la plantilla
        return render_template('profile.html', prediction=prediction_json)

    else:    
        return render_template('profile.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
