import '@styles/votation.css'


const Votation = () => {
  return(
        <div className="votation-page">
          <h2>Candidatos Postulados</h2>
          <table className="showResult-votation">
            <tbody>
              <tr>
                <td>Candidatos Postulados</td>
                <td>
                 <a href="http://localhost:3000/api/pdf" download="Candidatos.pdf">
                <button>Ver</button>
                </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h2> Registro Asistencia Votos</h2>
          <table className="showResult-votation">
            <tbody>
              <tr>
                <td>Personas que votaron</td>
                <td>
                 <a href="http://localhost:3000/api/pdf/votos" download="Votos.pdf">
                <button>Ver</button>
                </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
  )
}

export default Votation;