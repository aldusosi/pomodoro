import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const modos = [
    {
      value:"pomodoro",
      conteudo:"pomodoro",
      tempo:20*60,
    },
    {
      value:"short-time",
      conteudo:"Short time",
      tempo:5*60
    },
    {
      value:"long-time",
      conteudo:"Long time",
      tempo:15*60
    },]

    const estadoPadrao = modos[0];

    const [estadoAtual, setEstadoAtual] = useState(estadoPadrao.value);
    const [estaContando, setEstaContando] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(estadoPadrao.tempo);
    const [restart, setRestart] = useState(false);

    const minutos = String(Math.floor(tempoRestante/60)).padStart(2, "0");
    const segundos = String(Math.floor(tempoRestante%60)).padStart(2, "0");

    useEffect(()=>{
      const estados = modos.find((estado) => estado.value === estadoAtual);
      setTempoRestante(estados.tempo);
      setEstaContando(false)

    },[estadoAtual]);

    useEffect(()=>{
      if(estaContando){
          const intervalId = setInterval(()=>{
          setTempoRestante(tempoRestante =>{
            if(tempoRestante > 0){
              return (tempoRestante-1);
            }else{
              return 0;
            }
          });
        },1000);

        return(()=>{
          clearInterval(intervalId)
        })
      }
      
    },[estaContando]);

    function handleRestart(){
      const tempo = modos.find(modo => modo.value === estadoAtual);
      setEstaContando(false);
      return tempo.tempo;
    }

  return (
    <div className="App">
      <div class="titulo"><h1>Pomodoro</h1></div>

      <main>
        <div class="estados">
          {
            modos.map( modo => {
             return <button className={estadoAtual === modo.value ? "selecionado" : ""} 
             onClick={()=>setEstadoAtual(modo.value)}>{modo.conteudo}</button>
            })
          }
      </div>

      <div class="cronometro">
        
        <div class="tempo">
          <div class="relogio">{minutos}:{segundos}</div>
          <button onClick={()=>setEstaContando(()=>(!estaContando))}>{estaContando ? "Stop" : "Start"}</button>
          <button onClick={()=>setTempoRestante(handleRestart)}> Restart </button>
        </div>

        <div class="configuracoes">
          
        </div>
      </div>
      
      </main>
      

    </div>
  );
}

export default App;
