import React, { useState } from 'react';
import './style.css';
import ReactDOM from 'react-dom';

const App = () => {
  const [asignatura, setAsignatura] = useState('');
  const [codigoAsignatura, setCodigoAsignatura] = useState('');
  const [docente, setDocente] = useState('');
  const [codigoDocente, setCodigoDocente] = useState('');
  const [grupo, setGrupo] = useState('');
  const [codigoGrupo, setCodigoGrupo] = useState('');
  const [salon, setSalon] = useState('');
  const [codigoSalon, setCodigoSalon] = useState('');
  const [horarioGenerados, setHorarioGenerados] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [salones, setSalones] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingType, setEditingType] = useState('');

  const handleLogoClick = () => {
    alert("Ir al perfil del usuario");
  };

  const resetForm = () => {
    setAsignatura('');
    setCodigoAsignatura('');
    setDocente('');
    setCodigoDocente('');
    setGrupo('');
    setCodigoGrupo('');
    setSalon('');
    setCodigoSalon('');
    setEditingIndex(null);
    setEditingType('');
  };

  // Manejo de asignaturas
  const handleAddAsignatura = () => {
    const nuevoAsignatura = { asignatura, codigo: codigoAsignatura };
    if (editingType === 'asignatura') {
      const updatedAsignaturas = asignaturas.map((item, index) =>
        index === editingIndex ? nuevoAsignatura : item
      );
      setAsignaturas(updatedAsignaturas);
    } else {
      setAsignaturas([...asignaturas, nuevoAsignatura]);
    }
    resetForm();
  };

  const handleEditAsignatura = (index) => {
    const asignaturaToEdit = asignaturas[index];
    setAsignatura(asignaturaToEdit.asignatura);
    setCodigoAsignatura(asignaturaToEdit.codigo);
    setEditingIndex(index);
    setEditingType('asignatura');
  };

  const handleDeleteAsignatura = (index) => {
    const updatedAsignaturas = asignaturas.filter((_, i) => i !== index);
    setAsignaturas(updatedAsignaturas);
  };

  // Manejo de docentes
  const handleAddDocente = () => {
    const nuevoDocente = { docente, codigo: codigoDocente };
    if (editingType === 'docente') {
      const updatedDocentes = docentes.map((item, index) =>
        index === editingIndex ? nuevoDocente : item
      );
      setDocentes(updatedDocentes);
    } else {
      setDocentes([...docentes, nuevoDocente]);
    }
    resetForm();
  };

  const handleEditDocente = (index) => {
    const docenteToEdit = docentes[index];
    setDocente(docenteToEdit.docente);
    setCodigoDocente(docenteToEdit.codigo);
    setEditingIndex(index);
    setEditingType('docente');
  };

  const handleDeleteDocente = (index) => {
    const updatedDocentes = docentes.filter((_, i) => i !== index);
    setDocentes(updatedDocentes);
  };

  // Manejo de grupos
  const handleAddGrupo = () => {
    const nuevoGrupo = { grupo, codigo: codigoGrupo };
    if (editingType === 'grupo') {
      const updatedGrupos = grupos.map((item, index) =>
        index === editingIndex ? nuevoGrupo : item
      );
      setGrupos(updatedGrupos);
    } else {
      setGrupos([...grupos, nuevoGrupo]);
    }
    resetForm();
  };

  const handleEditGrupo = (index) => {
    const grupoToEdit = grupos[index];
    setGrupo(grupoToEdit.grupo);
    setCodigoGrupo(grupoToEdit.codigo);
    setEditingIndex(index);
    setEditingType('grupo');
  };

  const handleDeleteGrupo = (index) => {
    const updatedGrupos = grupos.filter((_, i) => i !== index);
    setGrupos(updatedGrupos);
  };

  // Manejo de salones
  const handleAddSalon = () => {
    const nuevoSalon = { salon, codigo: codigoSalon };
    if (editingType === 'salon') {
      const updatedSalones = salones.map((item, index) =>
        index === editingIndex ? nuevoSalon : item
      );
      setSalones(updatedSalones);
    } else {
      setSalones([...salones, nuevoSalon]);
    }
    resetForm();
  };

  const handleEditSalon = (index) => {
    const salonToEdit = salones[index];
    setSalon(salonToEdit.salon);
    setCodigoSalon(salonToEdit.codigo);
    setEditingIndex(index);
    setEditingType('salon');
  };

  const handleDeleteSalon = (index) => {
    const updatedSalones = salones.filter((_, i) => i !== index);
    setSalones(updatedSalones);
  };

  // Función para generar horario
  const generateHorario = async () => {
    const response = await fetch('http://localhost:5000/generate_horario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ asignaturas }),
    });
    
    if (response.ok) {
      const horarioGenerado = await response.json();
      setHorarioGenerados(horarioGenerado); // Actualiza el estado con el nuevo horario
    } else {
      alert("Error al generar el horario");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Horario Escolar</h1>
        <div className="nav">
          <span>Docentes</span>
          <span>Grupos</span>
          <span>Aula</span>
          <img src="logo.png" alt="Logo" className="logo" onClick={handleLogoClick} />
        </div>
      </header>
      <main>
        <div className="form-container">
          <h2>Asignaturas Agregadas</h2>
          <ul>
            {asignaturas.map((item, index) => (
              <li key={index}>
                {`${item.asignatura} - ${item.codigo}`}
                <button onClick={() => handleEditAsignatura(index)}>Editar</button>
                <button onClick={() => handleDeleteAsignatura(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <input 
            type="text" 
            placeholder="Asignatura" 
            value={asignatura} 
            onChange={(e) => setAsignatura(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Código Asignatura" 
            value={codigoAsignatura} 
            onChange={(e) => setCodigoAsignatura(e.target.value)} 
          />
          <button type="button" onClick={handleAddAsignatura}>
            {editingType === 'asignatura' ? 'Guardar Cambios' : 'Agregar Asignatura'}
          </button>
        </div>

        <div className="form-container">
          <h2>Docentes Agregados</h2>
          <ul>
            {docentes.map((item, index) => (
              <li key={index}>
                {`${item.docente} - ${item.codigo}`}
                <button onClick={() => handleEditDocente(index)}>Editar</button>
                <button onClick={() => handleDeleteDocente(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <input 
            type="text" 
            placeholder="Docente" 
            value={docente} 
            onChange={(e) => setDocente(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Código Docente" 
            value={codigoDocente} 
            onChange={(e) => setCodigoDocente(e.target.value)} 
          />
          <button type="button" onClick={handleAddDocente}>
            {editingType === 'docente' ? 'Guardar Cambios' : 'Agregar Docente'}
          </button>
        </div>

        <div className="form-container">
          <h2>Grupos Agregados</h2>
          <ul>
            {grupos.map((item, index) => (
              <li key={index}>
                {`${item.grupo} - ${item.codigo}`}
                <button onClick={() => handleEditGrupo(index)}>Editar</button>
                <button onClick={() => handleDeleteGrupo(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <input 
            type="text" 
            placeholder="Grupo" 
            value={grupo} 
            onChange={(e) => setGrupo(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Código Grupo" 
            value={codigoGrupo} 
            onChange={(e) => setCodigoGrupo(e.target.value)} 
          />
          <button type="button" onClick={handleAddGrupo}>
            {editingType === 'grupo' ? 'Guardar Cambios' : 'Agregar Grupo'}
          </button>
        </div>

        <div className="form-container">
          <h2>Salones Agregados</h2>
          <ul>
            {salones.map((item, index) => (
              <li key={index}>
                {`${item.salon} - ${item.codigo}`}
                <button onClick={() => handleEditSalon(index)}>Editar</button>
                <button onClick={() => handleDeleteSalon(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <input 
            type="text" 
            placeholder="Salón" 
            value={salon} 
            onChange={(e) => setSalon(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Código Salón" 
            value={codigoSalon} 
            onChange={(e) => setCodigoSalon(e.target.value)} 
          />
          <button type="button" onClick={handleAddSalon}>
            {editingType === 'salon' ? 'Guardar Cambios' : 'Agregar Salón'}
          </button>
        </div>

        <div className="form-container">
          <h2>Horario Generado</h2>
          <ul>
            {horarioGenerados.map((item, index) => (
              <li key={index}>{`${item.hora}: ${item.asignatura.asignatura}`}</li>
            ))}
          </ul>
          <button type="button" onClick={generateHorario}>
            Generar Horario
          </button>
        </div>
        
        <footer>
          <p>© 2024 Mi Empresa. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
