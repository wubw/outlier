import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
declare var pdfjsLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient) {
    this.http
      .get(`${environment.api_url}/test`).subscribe(res => {
        this.test_value = res.toString();
      })
  }

  title = 'frontend';
  test_value = '';

  myState = { pdf: null, currentPage: 1, zoom: 1 }

  ngAfterViewInit() {
    // this.navBarHide();
  }

  ngOnInit() {

    // more code here
    pdfjsLib.getDocument('assets/DownloadURL.pdf').then((pdf) => {
      console.log('haha');
      this.myState.pdf = pdf;
      this.render();
      // more code here

    });
  }

  render() {
    this.myState.pdf.getPage(this.myState.currentPage).then((page) => {

      // more code here
      var canvas = <HTMLCanvasElement> document.getElementById("pdf_renderer");
      var ctx = canvas.getContext('2d');

      var viewport = page.getViewport(this.myState.zoom);
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({
        canvasContext: ctx,
        viewport: viewport
      });

    });
  }

  goPrevious(e) {
    if (this.myState.pdf == null || this.myState.currentPage == 1) return;
    this.myState.currentPage -= 1;
    let htmlinputelement = <HTMLInputElement>document.getElementById("current_page");
    htmlinputelement.value = this.myState.currentPage.toString();
    this.render();
  }

  goNext(e) {
    if (this.myState.pdf == null || this.myState.currentPage > this.myState.pdf._pdfInfo.numPages)
      return;

    this.myState.currentPage += 1;
    let htmlinputelement = <HTMLInputElement>document.getElementById("current_page");
    htmlinputelement.value = this.myState.currentPage.toString();
    this.render();
  }

  currentpageKeyPress(e) {
    if (this.myState.pdf == null) return;

    // Get key code
    var code = (e.keyCode ? e.keyCode : e.which);

    // If key code matches that of the Enter key
    if (code == 13) {
      let htmlinputelement = <HTMLInputElement>document.getElementById("current_page");
      var desiredPage = htmlinputelement.valueAsNumber;

      if (desiredPage >= 1
        && desiredPage <= this.myState.pdf
          ._pdfInfo.numPages) {
        this.myState.currentPage = desiredPage;

        
        htmlinputelement.value = desiredPage.toString();
        this.render();
      }
    }
  }

  zoomIn(e) {
    if (this.myState.pdf == null) return;
    this.myState.zoom += 0.5;
    this.render();
  }

  zoomOut(e) {
    if (this.myState.pdf == null) return;
    this.myState.zoom -= 0.5;
    this.render();
  }
}
