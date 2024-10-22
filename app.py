from flask import Flask, request, jsonify
import random
app = Flask(__name__)
@app.route('/generate_horario', methods=['POST'])
def generate_horario():
    data = request.json
    asignaturas = data.get('asignaturas', [])
    # Lógica para generar el horario
    horas = [
        '6:30', '7:00', '7:30', '8:00', '8:30',
        '9:00', '9:30', '10:00', '10:30', '11:00',
        '11:30', '12:00', '12:30'
    ]
    nuevo_horario = []
    contador_asignaturas = {}

    while len(nuevo_horario) < 7:
        asignatura = random.choice(asignaturas)
        
        if asignatura['codigo'] not in contador_asignaturas:
            contador_asignaturas[asignatura['codigo']] = 0

        if contador_asignaturas[asignatura['codigo']] < 2:
            hora = random.choice(horas)
            
            # Verifica que la hora no esté ocupada
            if not any(item['hora'] == hora for item in nuevo_horario):
                nuevo_horario.append({'hora': hora, 'asignatura': asignatura})
                contador_asignaturas[asignatura['codigo']] += 1

    return jsonify(nuevo_horario)

if __name__ == '__main__':
    app.run(debug=True)
