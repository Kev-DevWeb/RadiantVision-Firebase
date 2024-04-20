# -*- coding: utf-8 -*-
"""
Created on Sun Apr  7 17:49:17 2024

@author: jmame
"""


from bs4 import BeautifulSoup as bs
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


##---------------------------------------------------------------Extraer HTML------------------------------------------------##

options = Options()
##options.page_load_strategy = 'normal'
browser = webdriver.Chrome(options=options)
browser.set_page_load_timeout(50)
url = "https://tracker.gg/valorant/profile/riot/gyro%23YNXO/overview"

try:
   browser.get(url)
except:
  pass

##Extraer y reacomomodar HTML

html = browser.page_source
print(html)

soup = bs(html, 'lxml')
soup

##Cerrar pestaña y navegador
browser.close()
browser.quit()

##---------------------------------------------------------------Extraer Datos del HTML----------------------------------------##

##Extraccion de datos de IDENTIFICACION

player = soup.find('span', {'class':'trn-ign__username'}).text.strip()
player
tag = soup.find('span', {'class':'trn-ign__discriminator'}).text.strip()
tag


rankList = soup.find_all('div',{'class':'rating-entry'})
rankList

if rankList:
    currentRank = rankList[0].find('div', {'class':'value'}).text
    peakRank = rankList[1].find('div', {'class':'value'}).text
else:
    print("La lista de Rangos esta vacia")


##Extraccion de datos de PARTIDAS

matchesList = soup.find_all('text', {'fill':'#fff'})
##matchesList       ##--------Imprimir la lista

if rankList:
    numberWins = matchesList[0].text
    numberLose = matchesList[1].text
else:
    print("La lista V/D esta vacia")


##Extraccion de datos de WINRATE Y COMBATE

statList  = soup.find_all('div',{'class':'numbers'})
##statList     ###----- Imprimir la lista

#Extraccion de Stats de Combate
if statList:
    winrate = statList[3].find('span', {'class':'value'}).text[:-1]
    avgCS = statList[10].find('span', {'class':'value'}).text
    kdaRatio = statList[11].find('span', {'class':'value'}).text
    killsPerRound = statList[12].find('span', {'class':'value'}).text
    avgDmgRound = statList[0].find('span', {'class':'value'}).text
    kills = statList[7].find('span', {'class':'value'}).text
    deadths = statList[8].find('span', {'class':'value'}).text
    assist = statList[9].find('span', {'class':'value'}).text

else:
    print("La lista de stats esta vacia")


##Extraccion de datos de PRECISION

accuracyList = soup.find_all('td',{'class':'stat'})
accuracyList ##----- Imprimir la lista

if accuracyList:  # Verificar si accuracyList no está vacía
    headshots = accuracyList[0].find('span',{'class':'stat__value'}).text[:-1]
    boddyshots = accuracyList[2].find('span', {'class':'stat__value'}).text[:-1]
    legsshots = accuracyList[4].find('span', {'class':'stat__value'}).text[:-1]
    # Continuar con el procesamiento de los datos...
else:
    print("La lista accuracyList está vacía")
    
##---------------------------------------------------------------LLenado del Dataframe----------------------------------------##

playerData = pd.DataFrame([{'riotID':player, 'tag':tag, 'currentRank':currentRank, 'peakRank':peakRank, 'numWins':numberWins, 
           'numLose':numberLose, 'winrate':winrate, 'avgCS':avgCS, 'KDArat':kdaRatio, 'kpr':killsPerRound, 
           'avgDmgRound':avgDmgRound, 'kills':kills, 'deaths':deadths, 'assist':assist, 
           'headPercent':headshots, 'boddyPercent':boddyshots, 'legsPercent':legsshots}])

playerData























