import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css'],
  imports:[CommonModule,RouterModule],
  standalone: true,  // Ajout de standalone
})
export class AProposComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    window.addEventListener("scroll", () => {
      let sections = document.querySelectorAll(".about-section");
      sections.forEach((section) => {
        let rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add("show");
        }
      });
    });
  }
}
