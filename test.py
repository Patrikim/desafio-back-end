import requests
import json

# URL base do seu servidor
BASE_URL = "http://localhost:3000/api/messages/sms"

# Função para testar a atualização do status da mensagem
def test_update_status(message_id, status):
    url = f"{BASE_URL}/update-status/{message_id}"
    payload = {"status": status}
    
    response = requests.put(url, json=payload)

    print(f"Testando atualização do status para ID {message_id} com status '{status}'...")
    print(f"Status Code: {response.status_code}")
    
    try:
        print("Response:", response.json())
    except json.JSONDecodeError:
        print("Response: Não foi possível decodificar a resposta como JSON.")
    
    print()

# Função para testar a recuperação de mensagens por status
def test_get_messages_by_status(status):
    url = f"{BASE_URL}/report/{status}"
    
    response = requests.get(url)

    print(f"Testando recuperação de mensagens com status '{status}'...")
    print(f"Status Code: {response.status_code}")
    
    try:
        print("Response:", response.json())
    except json.JSONDecodeError:
        print("Response: Não foi possível decodificar a resposta como JSON.")
    
    print()

# Testando a atualização do status (substitua pelos IDs válidos)
test_update_status(1, "ENVIADO")  # Teste com um ID existente e status válido
test_update_status('bbb', "RECEBIDO")  # Teste com um ID que não existe
test_update_status(1, "STATUS_INVALIDO")  # Teste com status inválido

# Testando a recuperação de mensagens (substitua pelos status válidos)
test_get_messages_by_status("ENVIADO")  # Teste com um status válido
test_get_messages_by_status("STATUS_INVALIDO")  # Teste com status inválido
