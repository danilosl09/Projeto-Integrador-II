import mysql.connector
from mysql.connector import Error
import random
import time
from datetime import datetime


###########################################################################################################################
def create_server_and_db_connection(localhost="localhost", user='root', user_password="123456", db_name="getdatamachine"):
    connection = None
    try:
        connection = mysql.connector.connect(
            host = localhost,
            user = user,
            passwd = user_password,
            database = db_name
        )
        print("MySQL Database connection successful")
    except Error as err:

        print(f"Error: '{err}'")

    return connection
###########################################################################################################################

###########################################################################################################################
# --> Esta função executa um "COMANDO" criação e alteração em "Tabelas" no banco de dados
def execute_query(connection, comand):
    cursor = connection.cursor()
    try:
        cursor.execute(comand)
        connection.commit()
        print("Query successful")
    except Error as err:
        print(f"Error: '{err}'")
###########################################################################################################################

###########################################################################################################################
# --> Aqui começa o loop infinito para inserção de dados no banco 
while True:
    try:
        connection = create_server_and_db_connection()
        cursor = connection.cursor()
        # Gerar número aleatório de 0 a 10
        numero_aleatorio = str(random.randint(0, 15))
        print(numero_aleatorio)        
        #Gera a data e hora atual
        dataHora = None
        dataHora = datetime.now()
        # dataHora = dataHora.strftime('%Y-%m-%d %H:%M:%S')
        print(dataHora)  
        # Inserir número aleatório no banco de dados na tabela dados item valorDado
        execute_query(connection, "INSERT INTO dados (valorDado) VALUES ('"+numero_aleatorio+"')")

        # Inserir número aleatório no banco de dados na tabela dados item date_time e valorDado caso não esteja default a inserção de dados.
        # execute_query(connection, "INSERT INTO dados (date_time, valorDado) VALUES ('"+dataHora+"', '"+numero_aleatorio+"')")

        # Fechar conexão
        cursor.close()
        connection.close()
        # Aguardar 1 segundo antes de gerar o próximo número
        time.sleep(1)

    except Exception as e:
        print(f"Erro: {e}")

        # Em caso de erro, tentar novamente após um intervalo
        time.sleep(5)
