Live URL : https://piyalidas10.github.io/organizationalchart/

Run Application

ng serve


There have two JSON files which are kept in assets folder ( oranganization_structure.json, employee.json ). I have implemented two components : 1. addchart - to enter data in chart 2. viewchart - to show the organization chart using directive i.e orgachart.directive.

Using this orgachart.directive, organization chart is implemented dynamically in DOM.

orgachart.directive

      import { Directive, OnInit, DoCheck, AfterViewInit, Input, Renderer2, ElementRef, KeyValueDiffers } from '@angular/core';


      @Directive({
        selector: '[appOrgachart]'
      })
      export class OrgachartDirective implements OnInit, AfterViewInit, DoCheck {
        @Input() empArr;
        @Input() orgaArr;
        @Input() isEmpArrChange;
        oldval = [];
        constructor(private renderer: Renderer2, private elementRef: ElementRef, private _differ: KeyValueDiffers) { }


        ngOnInit() {
          console.log('renderer => ', this.renderer);
          console.log('elementRef => ', this.elementRef);
          console.log('empArr => ', this.empArr);
          this.createOrgaChart();
          this.oldval = this.empArr;
        }


        ngDoCheck() {
          if (this.oldval !== this.empArr) {
            console.log('empArr updated => ', this.empArr);
            this.createOrgaChart();
          }
          console.log('this._differ => ', this._differ);
        }


        createOrgaChart() {
          console.log('this.empArr => ', this.empArr);
          const supervisorList = this.empArr.map(ele => ele.supervisorid);
          console.log('supervisorList => ', supervisorList);
          const uniqueSuoervisorList = supervisorList.filter((ele, index) => supervisorList.indexOf(ele) === index);
          const ulcount = uniqueSuoervisorList.length;
          console.log('ulcount => ', ulcount);
          const isUlEle = this.elementRef.nativeElement.querySelectorAll('ul');
          console.log('isUlEle => ', isUlEle);
          if (isUlEle.length > 0) {
            Array.prototype.forEach.call(isUlEle, (node) =>  {
              node.parentNode.removeChild( node );
            });
          }
          for (let i = 0; i < ulcount; i++) {
            const liLists = this.empArr.filter(ele => ele.supervisorid === i);
            this.createUlElem(i, liLists);
          }
        }


        createUlElem(parentid, liLists) {
          console.log('liLists ------------------------------------- ', liLists);
          const ulelem = this.renderer.createElement('ul');
          if (parentid === 0) {
            this.renderer.appendChild(this.elementRef.nativeElement, ulelem);
            const lielem = this.renderer.createElement('li');
            this.renderer.appendChild(ulelem, lielem);
            this.insertLiText(parentid, liLists, lielem);
          } else {
            // const parentul = this.elementRef.nativeElement.querySelectorAll('ul:nth-child(' + parentid + ')');
            for (let z = 0; z < liLists.length; z++) {
              console.log('supdervisor => ', liLists[z]['supervisorid']);
              const supvisorDiv = this.elementRef.nativeElement.querySelector('#emp' + liLists[z]['supervisorid']);
              console.log('supvisorDiv => ', supvisorDiv);
              const supvisorLi = supvisorDiv.parentElement;
              console.log('PIYALI => ', '#emp' + liLists[z]['supervisorid']);
              console.log('supvisorLi => ', supvisorLi);
              console.log('ulelem => ', ulelem);
              this.renderer.appendChild(supvisorLi, ulelem);
              const lielem = this.renderer.createElement('li');
              this.renderer.appendChild(ulelem, lielem);
              this.insertLiText(z, liLists, lielem);
            }
          }
        }


        insertLiText(item, liLists, lielem) {
          console.log('lielem => ', lielem);
          const div = this.renderer.createElement('div');
          this.renderer.setAttribute(div, 'class', 'user');
          this.renderer.setAttribute(div, 'id', 'emp' + liLists[item].empid);
          this.renderer.appendChild(lielem, div);


          const imgpath = this.renderer.createElement('img');
          this.renderer.setAttribute(imgpath, 'src', 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg');
          this.renderer.setAttribute(imgpath, 'class', 'img-responsive');
          this.renderer.appendChild(div, imgpath);


          const divname = this.renderer.createElement('div');
          const divname_text = this.renderer.createText(liLists[item].empname);
          this.renderer.setAttribute(divname, 'class', 'name');
          this.renderer.appendChild(divname, divname_text);
          this.renderer.appendChild(div, divname);


          const divroll = this.renderer.createElement('div');
          const divroll_text = this.renderer.createText(liLists[item].empdesgname);
          this.renderer.setAttribute(divroll, 'class', 'roll');
          this.renderer.appendChild(divroll, divroll_text);
          this.renderer.appendChild(div, divroll);
        }


        ngAfterViewInit() {}


      }
