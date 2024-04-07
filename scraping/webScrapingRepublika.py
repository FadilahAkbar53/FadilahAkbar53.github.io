import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

page = requests.get("https://www.republika.co.id/")
soup = BeautifulSoup(page.text, 'html.parser')

informations = []
no = 1

for headline in soup.find_all('li', class_='list-group-item list-border conten1'):
    date_element = headline.find('div', class_='date')
    if date_element:
        # Mengambil teks waktu publish tanpa span tambahan dan menghapus "- spasi" di awal kalimat
        waktu_publish = ''.join(item.strip() for item in date_element.contents if isinstance(item, str)).lstrip('- ')
    else:
        waktu_publish = None
    newData = { 
        'no' : no, #menambahkan no urut
        'judul berita': headline.h3.text.strip(), 
        'kategori':headline.find('span', class_='kanal-info').text.strip(), 
        'waktu publish': waktu_publish, 
        'waktu scraping': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    informations.append(newData)
    no += 1

jdum = json.dumps(informations)
file = open('hasilScraping.json', 'w')
file.write(jdum)
print(informations)