import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [BrowserModule, FormsModule, BrowserModule],
    exports: [BrowserModule, FormsModule, BrowserModule],
})
export class SharedModule {}
