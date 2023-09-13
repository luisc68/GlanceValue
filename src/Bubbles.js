import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import './modal.css';
import health from './img/icon _health.png';
import casco from './img/casco.png';
import chaleco from './img/chaleco.png';
import head from './img/head.png';
import torso from './img/torso.png';
import cuchillo from './img/cuchillo.png';
import granadaflash from './img/granadaflash.png';
import granadaexplo from './img/granadaexplo.png';
import granadahumo from './img/granadahumo.png';
import arma1 from './img/arma1.png';
import balas1 from './img/balas1.png';
import bomb from './img/bomb.png';
import team from './img/team.png';

function Bubbles({ blueTeam, redTeam }) {
  const [bubbles, setBubbles] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const menuBtnRef = useRef(null);

  const generateBubbles = () => {
    const radius = 100;
    let angle = 0;
    const newBubbles = [];

    [blueTeam, redTeam].forEach((team, index) => {
      team.forEach((player, i) => {
        const color = index === 0 ? "blue" : "red";
        const x =
          menuBtnRef.current.getBoundingClientRect().left +
          radius * Math.cos(angle);
        const y =
          menuBtnRef.current.getBoundingClientRect().top +
          radius * Math.sin(angle);

        newBubbles.push({
          x,
          y,
          color,
          player,
          opacity: 1
        });

        angle += (2 * Math.PI) / (blueTeam.length + redTeam.length);
      });
    });

    setBubbles(newBubbles);
  };

  useEffect(() => {
    generateBubbles();
  }, [blueTeam, redTeam]);

  const handleBubbleClick = (e, player) => {
    e.preventDefault();
    e.nativeEvent.preventDefault();
    setShowModal(player);
  };

  const handleMenuBtnClick = () => {
    if (bubbles.length === 0) {
      console.log("se generan....");
      generateBubbles();
    } else {
      setBubbles([]);
    }
  };

  const handleDrag = (e, ui) => {
    // Obtener las dimensiones del botón del menú
    const buttonWidth = menuBtnRef.current.offsetWidth;
    const buttonHeight = menuBtnRef.current.offsetHeight;

    // Obtener las dimensiones de la ventana del navegador
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular los límites para el botón del menú
    const maxX = windowWidth - buttonWidth;
    const maxY = windowHeight - buttonHeight;

    // Verificar los límites y ajustar las coordenadas según sea necesario
    if (ui.x < 0) {
      ui.x = 0;
    } else if (ui.x > maxX) {
      ui.x = maxX;
    }

    if (ui.y < 0) {
      ui.y = 0;
    } else if (ui.y > maxY) {
      ui.y = maxY;
    }

    // Actualizar la posición del botón del menú
    menuBtnRef.current.style.transform = `translate(${ui.x}px, ${ui.y}px)`;
    
    // Actualizar el estado de las burbujas
    setBubbles([]);
  };

  const handleStopDrag = () => {
    // Volver a generar las burbujas después de soltar el botón
    handleMenuBtnClick();
  };

  return (
    <div>
      <Draggable
        onDrag={handleDrag}
        onStop={handleStopDrag}
      >
        <div className="menu-button" ref={menuBtnRef} />
        
      </Draggable>
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`bubble ${bubble.color}`}
          style={{
            top: bubble.y,
            left: bubble.x,
            opacity: bubble.opacity,
            position: "absolute"
          }}
          onClick={(e) => handleBubbleClick(e, bubble.player)}
        >
          <img src={bubble.player.profile} alt={bubble.player.name} />
          <p className="player-name">{bubble.player.name}</p>
        </div>
      ))}
      {showModal && (
        <Draggable>
          <div className="modal-content">
          <div className="modal-content">
       
       <div className='rectangulo'>
       <div className="image-element-container">
         <img className="image-element" src={showModal.teamprofile} alt="Imagen" />
       </div>


       <div className='profile-image-container'>
         <img className='profile-image' src={showModal.profile} alt="Imagen" />
       </div>


       <div className='textcontainer'>
         <p className='name-text'>{showModal.name}</p>
         <p className='date-text'>{showModal.date}</p>
         <p className='money-text'>{showModal.money}</p>
         
       </div>


       <div className='health-image-container'>
         <img className='health-image' src={health} alt="Imagen" />
         <p className='health-text'>{showModal.life}</p>
       </div>

  
       <div className='casco-image-container'>
         <img className='casco-image' src={casco} alt="Imagen" />
         <div className='chaleco-image-container'>
           <img className='chaleco-image' src={chaleco} alt="Imagen" />
           <p className='escudo-text'>{showModal.escudo}</p>
         </div>
       </div>

       <div className='textcontainerADR'>
         <p className='ADR-text'>ADR</p>
         <p className='ADRC-text'>{showModal.adr}</p>
       </div>

       <div className='head-image-container'>
           <img className='head-image' src={head} alt="Imagen" />
       </div>
    
       <div className='textcontainerKDA'>
         <p className='KDA-text'>Head</p>
         <p className='KDAC-text'>{showModal.head}</p>
     </div>


     <div className='torso-image-container'>
           <img className='torso-image' src={torso} alt="Imagen" />
       </div>
       
       <div className='textcontainertorso'>
         <p className='torso-text'>Torso</p>
         <p className='torsoc-text'>{showModal.torso}</p>
     </div>


     <div className='dmg-image-container'>
           <img className='dmg-image' src={cuchillo} alt="Imagen" />
       </div>
  
       <div className='textcontainerdmg'>
         <p className='dmg-text'>DMG</p>
         <p className='dmgl-text'>last</p>
         <p className='dmgr-text'>round</p>
         <p className='dmgc-text'>{showModal.dmg}</p>
     </div>


     <div className='granada-f-image-container'>
           <img className='granda-f-image' src={granadaflash} alt="Imagen" />
       </div>
  
       <div className='textcontainergranadaf'>
         <p className='granada-f-text'>{showModal.granadaflash}</p>
     </div>
       

     <div className='granada-e-image-container'>
           <img className='granda-e-image' src={granadaexplo} alt="Imagen" />
       </div>
      
       <div className='textcontainergranadae'>
         <p className='granada-e-text'>{showModal.granadaexplo}</p>
     </div>


     <div className='granada-h-image-container'>
           <img className='granda-h-image' src={granadahumo} alt="Imagen" />
       </div>
       
       <div className='textcontainergranadah'>
         <p className='granada-h-text'>{showModal.granadahumo}</p>
     </div>


     <div className='arma1-image-container'>
           <img className='arma1-image' src={arma1} alt="Imagen" />
       </div>
     <div className='balas1-image-container'>
           <img className='balas1-image' src={balas1} alt="Imagen" />
       </div>
      
       <div className='textcontainerarma1'>
         <p className='arma1-text'>{showModal.arma1}</p>
     </div>

     <div className='arma2-image-container'>
           <img className='arma2-image' src={arma1} alt="Imagen" />
       </div>
     <div className='balas2-image-container'>
           <img className='balas2-image' src={balas1} alt="Imagen" />
       </div>
 
       <div className='textcontainerarma2'>
         <p className='arma2-text'>{showModal.arma2}</p>
     </div>



     <div className='bomb-image-container'>
           <img className='bomb-image' src={bomb} alt="Imagen" />
       </div>


       <div className='team-image-container'>
           <img className='team-image' src={team} alt="Imagen" />
       </div>


     </div>
     <button className="close-modal" onClick={() => setShowModal(null)}>
     &#10005;
  </button>
         {/* <div className="modal">
               <div className="container">
       <div className="toggle" onClick={setShowModal(null)}>
         <input type="checkbox" />
         <span className="button"></span>
         <span className="label">🔙</span>
       </div>
     </div>
       </div> */}
       </div>
   
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Bubbles;
