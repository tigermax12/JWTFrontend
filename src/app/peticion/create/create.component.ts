import { Component } from '@angular/core';
import { PeticionService } from 'src/app/peticion/peticion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  selectedFile!: File; // Archivo seleccionado
  peticionForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private peticionService: PeticionService) {
    this.peticionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  crearPeticion() {
    if (this.peticionForm.invalid || !this.selectedFile) {
      this.mensaje = '⚠️ Todos los campos, incluido el archivo, son obligatorios.';
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.peticionForm.get('titulo')?.value);
    formData.append('descripcion', this.peticionForm.get('descripcion')?.value);
    formData.append('destinatario', this.peticionForm.get('destinatario')?.value);
    formData.append('categoria_id', this.peticionForm.get('categoria_id')?.value);
    formData.append('file', this.selectedFile); 

    this.peticionService.createPeticion(formData).subscribe({
      next: () => {
        this.mensaje = '✅ Petición creada con éxito!';
        this.peticionForm.reset();
        this.selectedFile = undefined!;
      },
      error: () => {
        this.mensaje = '❌ Ocurrió un error al crear la petición.';
      }
    });
  }
}
