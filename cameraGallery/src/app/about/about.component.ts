import { Component, OnInit } from '@angular/core';
// gsap
import {gsap} from 'gsap';
import {TimelineMax} from 'gsap/gsap-core';
import {Draggable} from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  
  integrantes = [{
    perfil: "../assets/images/juan.jpeg",
    nombre: "Juan Pablo",
    apellido: "Ortiz Rubio",
    correo: "jpablo.ortiz@javeriana.edu.co",
    linkedin: "https://www.linkedin.com/in/juan-pablo-ortiz-rubio/",
    github: "https://github.com/jpablo-ortiz"
  },
  {
    perfil: "../assets/images/kenneth.jpg",
    nombre: "Kenneth David",
    apellido: "Leonel Triana",
    correo: "kdavidleonelt@javeriana.edu.co",
    linkedin: "www.linkedin.com/in/kenneth-david-leonel-triana-4920b5162",
    github: "https://github.com/kennethLeonel"
  },
  {
    perfil: "../assets/images/camilo.jpeg",
    nombre: "Camilo Andrés",
    apellido: "Sandoval Guayambuco",
    correo: "sandovalg.camilo@javeriana.edu.co",
    linkedin: "https://www.linkedin.com/in/camilo-andres-sandoval-guayambuco/",
    github: "https://github.com/camilosan10"
  },
  {
    perfil: "../assets/images/cristian.jpg",
    nombre: "Cristian Javier",
    apellido: "Da camara Sousa",
    correo: "cristianj.dacamaras@javeriana.edu.co",
    linkedin: "https://www.linkedin.com/in/cristian-da-camara-844a0a129/",
    github: "https://github.com/CristianJavierDaCamaraSousa"
  }
  ]
  constructor(private router :Router,private route: ActivatedRoute) { }
  initScrollTriggers() {
    document.querySelectorAll(".box").forEach(box => {
      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          pin: false,
          start: "top center",
          end: "center center",
          markers: false,
          toggleActions: "play none none reverse"
        }
      });
      scrollBox.from(box, { y: 40, opacity: 0 });
    });
  }
  ngOnInit(): void {
      gsap.registerPlugin(ScrollTrigger,Draggable);
      this.initScrollTriggers();

  }
  
  
}
