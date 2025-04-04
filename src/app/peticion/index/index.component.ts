import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/peticion/peticion.service';
import { Peticion } from '../peticion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  peticiones!: Peticion[];  
  loading = true;
  error: string | null = null;

  constructor(private peticionService: PeticionService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPeticiones();
  }

  fetchPeticiones(): void {
    this.peticionService.getPeticiones().subscribe({
      next: (data) => {
        console.log('Respuesta cruda de la API:', data);
        // Asignar el array de peticiones desde la respuesta
        this.peticiones = data.peticiones;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener peticiones:', err);
        this.error = 'Hubo un error al obtener las peticiones';
        this.loading = false;
      }
    });
  }
  
  
  

}
