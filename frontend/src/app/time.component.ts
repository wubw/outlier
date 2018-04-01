import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

import { BaseComponent } from './base.component';
import { environment } from '../environments/environment';
import { TimeLog } from './timelog';
import { AuthService } from './auth.service';

import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  protected topic = 'time';
  private categories = [];
  private tags = [];

  private hourspent: number = 0.5;
  private selectedcategory: string;
  private selectedtag: string;

  private inputcategory: string;
  private inputtag: string;
  private statusinfo: string;

  private chart: Highcharts.ChartObject;

  constructor(http: Http, private userservice: AuthService) {
    super(http);
    this.retrieveDescription();
    this.retrieveCategory();
    this.retrieveTag();
  }

  ngAfterViewInit() {
    this.renderchartCategoryDist();
  }

  private retrieveCategory() {
    this.http.get(environment.apiUrl + this.topic + '/category')
      .toPromise()
      .then(response => response.text())
      .then(data => {
        this.categories = JSON.parse(data);
        if (!this.selectedcategory) {
          this.selectedcategory = this.categories[0];
        }
      })
      .catch(err => console.log(err));
  }

  private retrieveTag() {
    this.http.get(environment.apiUrl + this.topic + '/tag')
      .toPromise()
      .then(response => response.text())
      .then(data => {
        this.tags = JSON.parse(data);
        if (!this.selectedtag) {
          this.selectedtag = this.tags[0];
        }
      })
      .catch(err => console.log(err));
  }

  private addTimelog() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json-patch+json');
    headers.append('Accept', 'application/json');

    let timelog = new TimeLog();
    timelog.Category = this.selectedcategory;
    timelog.HourSpent = this.hourspent;
    timelog.Tags = [ this.selectedtag ];
    timelog.UserId = this.userservice.userid;
    timelog.StartTime = new Date();
    console.log(timelog);
    let payload = JSON.stringify(timelog);
    console.log(payload);
    this.http.post(environment.apiUrl + this.topic, 
      payload, { headers: headers })
      .subscribe(() => {
        this.statusinfo = 'New time log has been registered.';
      }, err => console.log(err));
  }

  private addCategory() {
    if (this.categories.includes(this.inputcategory)) {
      alert('Category ' + this.inputcategory + ' exists.');
      return;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json-patch+json');
    headers.append('Accept', 'application/json');

    this.http.post(environment.apiUrl + this.topic + '/category',
      JSON.stringify(this.inputcategory), { headers: headers })
      .subscribe(() => {
          this.retrieveCategory();
          this.statusinfo = 'New category ' + this.inputcategory + ' has been created.';
          this.inputcategory = '';
        }, err => console.log(err));
  }

  private deleteCategory() {
    let id = this.categories.indexOf(this.inputcategory);
    if (id < 0) {
      alert('Category ' + this.inputcategory + ' does not exist.');
      return;
    }

    this.http.delete(environment.apiUrl + this.topic + '/category/' + id)
      .toPromise()
      .then(() => {
        this.retrieveCategory();
        alert('Category ' + this.inputcategory + ' has been deleted.');
        if (this.selectedcategory === this.inputcategory) {
          this.selectedcategory = this.categories[0];
        }
        this.inputcategory = '';
      })
      .catch(err => console.log(err));
  }

  private addTag() {
    if (this.tags.includes(this.inputtag)) {
      alert('Tag ' + this.inputtag + ' exists.');
      return;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json-patch+json');
    headers.append('Accept', 'application/json');

    this.http.post(environment.apiUrl + this.topic + '/tag',
      JSON.stringify(this.inputtag), { headers: headers })
      .subscribe(() => {
          this.retrieveTag();
          alert('New tag ' + this.inputtag + ' has been created.');
          this.inputtag = '';
        }, err => console.log(err));
  }

  private deleteTag() {
    let id = this.tags.indexOf(this.inputtag);
    if (id < 0) {
      alert('Tag ' + this.inputtag + ' does not exist.');
      return;
    }

    this.http.delete(environment.apiUrl + this.topic + '/tag/' + id)
      .toPromise()
      .then(() => {
        this.retrieveTag();
        alert('Category ' + this.inputtag + ' has been deleted.');
        if (this.selectedtag === this.inputtag) {
          this.selectedtag = this.tags[0];
        }
        this.inputtag = '';
      })
      .catch(err => console.log(err));
  }

  private renderchartCategoryDist() {
    let options = {
      chart: { 
        plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie'
      },
      title: {
        text: 'Time distribution between categories'
      },
      tooltip: {
        pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b><br>Value: <b>{point.y:.1f} hour</b>'
      },
      plotOptions: {
        pie: { 
            allowPointSelect: true, cursor: 'pointer',
            dataLabels: {
                enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
      }
    };
    this.chart = chart(this.chartTarget.nativeElement, options);
    let series = { name:'Categories', colorByPoint: true, data: []}
    this.http.get(environment.apiUrl + this.topic)
      .toPromise()
      .then(response => response.text())
      .then(data => {
        let timelogs = JSON.parse(data);
        let categorydist = timelogs.reduce((acc, curr) => {
          if (typeof acc[curr.category] === 'undefined') {
            acc[curr.category] = curr.hourSpent;
          } else {
            acc[curr.category] += curr.hourSpent;
          }
          return acc;
        }, {});

        for (let key in categorydist) {
          series.data.push({ name: key, y: categorydist[key]});
        }
        this.chart.addSeries(series);
      })
      .catch(err => console.log(err));
  }

  private renderchartTagDist() {
    let options = {
      chart: { 
        plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie'
      },
      title: {
        text: 'Time distribution between tags'
      },
      tooltip: {
        pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b><br>Value: <b>{point.y:.1f} hour</b>'
      },
      plotOptions: {
        pie: { 
            allowPointSelect: true, cursor: 'pointer',
            dataLabels: {
                enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
      }
    };
    this.chart = chart(this.chartTarget.nativeElement, options);
    let series = { name:'Tags', colorByPoint: true, data: []}
    this.http.get(environment.apiUrl + this.topic)
      .toPromise()
      .then(response => response.text())
      .then(data => {
        let timelogs = JSON.parse(data);
        let tagdist = timelogs.reduce((acc, curr) => {
          console.log(curr)
          if (typeof acc[curr.tags] === 'undefined') {
            acc[curr.tags] = curr.hourSpent;
          } else {
            acc[curr.tags] += curr.hourSpent;
          }
          return acc;
        }, {});

        for (let key in tagdist) {
          series.data.push({ name: key, y: tagdist[key]});
        }
        this.chart.addSeries(series);
      })
      .catch(err => console.log(err));
  }
}