import '@styles/votation.css'

const Votation = () => {
  return(
        <div className="votation-page">
          <h2>Candidatos Postulados</h2>
          <table className="showResult-votation">
            <thead>
              <tr>
                <th>Rut</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cargo</th>
                <th>Votos</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray()}
            </tbody>
          </table>
        </div>
  )
}

export default Votation;