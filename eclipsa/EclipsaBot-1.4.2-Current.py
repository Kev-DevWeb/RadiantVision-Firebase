# -*- coding: utf-8 -*-
"""
Created on Mon Apr 15 20:25:28 2024

@author: jmame
"""

from bs4 import BeautifulSoup as bs
import random
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

##---------------------------------------------------------------Lectura del CSV de Links------------------------------------------------##

#Carga de datos
df=pd.read_csv("D:/AppsWeb/Radiant-Vision/profileLinksComplete.csv")
df.drop(['id'], axis=1, inplace=True)

index=0
link = df['link'][index]

##---------------------------------------------------------------Funcion de Extraccion y llenado de DF INDIVIDUALES------------------------------------------------##

def parsearPerfiles(link):
    try:
        ##Busqueda del perfil    
        options = Options()
        #options.page_load_strategy = 'normal'
        browser = webdriver.Chrome(options=options)
        browser.set_page_load_timeout(30)
        url = link
        print("Profile: " + link)
        try:
           browser.get(url)   
           
        except:
            pass
        
        
        #Obtencion y reacomodo del HTML    
        html = browser.page_source
        #print(html)   ###----Imprimir HTML sin acomodar
        soup = bs(html, 'lxml')
        ##print(soup)          ###----Imrimir HTML acomodado
        
        ##Cerrar pestaña y navegador
        browser.close()
        browser.quit()
        
        ##Extraccion de datos de IDENTIFICACION

        nickname = soup.find('span', {'class':'trn-ign__username'}).text.strip()
        ##nickname
        tag = soup.find('span', {'class':'trn-ign__discriminator'}).text.strip()
        ##tag
        
        
        rankList = soup.find_all('div',{'class':'rating-entry'})
        rankList
        
        if rankList:
            currentRank = rankList[0].find('div', {'class':'value'}).text
            peakRank = rankList[1].find('div', {'class':'value'}).text
        else:
            print("La lista de Rangos esta vacia")
        
        
        ##Extraccion de datos de PARTIDAS
        
        matchesList = soup.find_all('text', {'fill':'#fff'})
        matchesList       ##--------Imprimir la lista
        
        if rankList:
            numberWins = matchesList[0].text
            numberLose = matchesList[1].text
        else:
            print("La lista V/D esta vacia")
        
        
        ##Extraccion de datos de WINRATE Y COMBATE
        
        statList  = soup.find_all('div',{'class':'numbers'})
        statList     ###----- Imprimir la lista
        
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
            headPercent = accuracyList[0].find('span',{'class':'stat__value'}).text[:-1]
            boddyPercent = accuracyList[2].find('span', {'class':'stat__value'}).text[:-1]
            legsPercent = accuracyList[4].find('span', {'class':'stat__value'}).text[:-1]
            # Continuar con el procesamiento de los datos...
        else:
            print("La lista accuracyList está vacía")
            
            
        ##LLENADO DE DATAFRAME
        
        player = pd.DataFrame([{'riotID':nickname, 'tag':tag, 'currentRank':currentRank, 'peakRank':peakRank, 'numWins':numberWins, 
                   'numLose':numberLose, 'winrate':winrate, 'avgCS':avgCS, 'KDArat':kdaRatio, 'kpr':killsPerRound, 
                   'avgDmgRound':avgDmgRound, 'kills':kills, 'deaths':deadths, 'assist':assist, 
                   'headPercent':headPercent, 'boddyPercent':boddyPercent, 'legsPercent':legsPercent}])
        
        df_stats = pd.DataFrame(player)
        return (df_stats)
    except:
        print("Profile Error")
        return None
    
##---------------------------------------------------------------LLENADO Y CONCATENADO DE DF FINAL------------------------------------------------##
##Repertir busqueda con otro perfil
df_stats_list = []  # Lista para almacenar los DataFrames individuales

if not df.empty:
    for i in range(len(df)):
        df_stats_list.append(parsearPerfiles(df['link'][i]))
        time.sleep(10)
else:
    print("El DataFrame df está vacío. No hay datos para procesar.")

# Concatenar todos los DataFrames de la lista en uno solo
df_stats = pd.concat(df_stats_list, ignore_index=False)

##Resetear indice y guardar datos en CSV
df_stats.to_csv("statsPlayersBig.csv", index = False, sep = ',', encoding = 'utf-16')