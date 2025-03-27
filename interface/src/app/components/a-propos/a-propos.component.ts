import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css'],
  imports:[CommonModule,RouterModule],
  standalone: true,  // Ajout de standalone
})
export class AProposComponent {

}
