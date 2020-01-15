import React from 'react';
//Importar CSS dentro do JavaScript
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';


function App() {
  return (
    <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form >

        <div className="input-block">
          <label htmlFor="github_usename">Usuario do Github</label>
          <input name="github_usename" id="github_usename" required/>
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required/>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="Latitude">Latitude</label>
            <input name="Latitude" id="Latitude" required/>
          </div>

          <div className="input-block">
            <label htmlFor="Longitude">Longitude</label>
            <input name="Longitude" id="Longitude" required/>
          </div>
        </div>

        <button type="submit">Salvar</button>

      </form>
    </aside>
    <main>
      <ul>
        <li className="dev-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/59746951?s=460&v=4" alt="Edvaldo Junior"/>
            <div className="user-info">
              <strong>Edvaldo Junior</strong>
              <span>PHP, React JS</span>
            </div>
          </header>
          <p>Teste BIO asuhdiajsdiasjdpsajdaspodkaspodkaspodkjsapodjas</p>
          <a href="https://github.com/edonejunior">Acessar Perfil Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/59746951?s=460&v=4" alt="Edvaldo Junior"/>
            <div className="user-info">
              <strong>Edvaldo Junior</strong>
              <span>PHP, React JS</span>
            </div>
          </header>
          <p>Teste BIO asuhdiajsdiasjdpsajdaspodkaspodkaspodkjsapodjas</p>
          <a href="https://github.com/edonejunior">Acessar Perfil Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/59746951?s=460&v=4" alt="Edvaldo Junior"/>
            <div className="user-info">
              <strong>Edvaldo Junior</strong>
              <span>PHP, React JS</span>
            </div>
          </header>
          <p>Teste BIO asuhdiajsdiasjdpsajdaspodkaspodkaspodkjsapodjas</p>
          <a href="https://github.com/edonejunior">Acessar Perfil Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/59746951?s=460&v=4" alt="Edvaldo Junior"/>
            <div className="user-info">
              <strong>Edvaldo Junior</strong>
              <span>PHP, React JS</span>
            </div>
          </header>
          <p>Teste BIO asuhdiajsdiasjdpsajdaspodkaspodkaspodkjsapodjas</p>
          <a href="https://github.com/edonejunior">Acessar Perfil Github</a>
        </li>
      </ul>
    </main>
  </div>
  )
}
export default App;
