import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CameraComponent } from './camera.component';

@NgModule({
	imports: [CommonModule],
	declarations: [CameraComponent],
	exports: [CameraComponent],
})
export class CameraModule {}
