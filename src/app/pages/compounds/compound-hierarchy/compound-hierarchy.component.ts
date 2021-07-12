import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CompoundCategories_CompoundHierarchyDTO  } from './../../../@core/Models/DTO/CompoundHierarchyDTO';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,NbButton } from '@nebular/theme';
import { compoundApiLinks } from './../../../@core/api-links/compound-links'
import { compoundUrls } from './../../../@core/urls/compounds'
import { ActivatedRoute  } from '@angular/router';
import { Console } from 'console';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'ngx-compound-hierarchy',
  templateUrl: './compound-hierarchy.component.html',
  styleUrls: ['./compound-hierarchy.component.scss']
})
export class CompoundHierarchyComponent{

  customColumn = 'name';
  defaultColumns = ['idCompoundCategory'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CompoundCategories_CompoundHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  platformId: string;

  public CompoundCategories: CompoundCategories_CompoundHierarchyDTO[] = [];
  private data: TreeNode<CompoundCategories_CompoundHierarchyDTO>[] ;

  constructor(
    private httpServices: HTTPService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundCategories_CompoundHierarchyDTO>,
    private router :Router,
    private route: ActivatedRoute
    )
   {
   this.route.queryParams.subscribe((params) => {
     this.platformId = params['platformId'];
     this.GetCompoundCategories(()=>{
      this.dataSource=this.dataSourceBuilder.create(this.data);
     })
   })
 }

 ngOnInit(){

 }

 GetCompoundCategories(callbackFun)
 {
  this.httpServices.Get(compoundApiLinks.getCompoundCategories, {platformId: this.platformId}).subscribe((CompoundCategories: TreeNode<CompoundCategories_CompoundHierarchyDTO>[])=>
  {
   this.data = this.MapData(CompoundCategories);
   callbackFun();
  }) ;
  return this.data ;
 }

 AddCompoundPage()
 {
   this.router.navigate([compoundUrls.addCompoundPage]);
 }

 MapData(res){
   let  mappedData=[];
   res.forEach(element => {
     mappedData.push(this.mapObj(element))
   });
   return mappedData ;
 }

 mapObj(_obj){
  let x={ data: { name:"",idCompoundCategory:""},children:[]}
   x=this.mapObjData(_obj);

   x.children= _obj.compoundCategoriesChildren?.map(a=>this.mapObjData(a) )
   return x
 }

 mapObjData(_obj){
  let x={ data: { name:"",idCompoundCategory:""},children:[]}
  x.data.name= _obj.name
  x.data.idCompoundCategory=_obj.idCompoundCategory;
  // debugger;
   if(_obj.compoundCategoriesChildren?.length > 0 ){   x.children= _obj.compoundCategoriesChildren?.map(a=>this.mapObj(a) ) ;}
  return x;
 }

updateSort(sortRequest: NbSortRequest): void {
  this.sortColumn = sortRequest.column;
  this.sortDirection = sortRequest.direction;
}

getSortDirection(column: string): NbSortDirection {
  if (this.sortColumn === column) {
    return this.sortDirection;
  }
  return NbSortDirection.NONE;
}

getShowOn(index: number) {
  const minWithForMultipleColumns = 400;
  const nextColumnStep = 100;
  return minWithForMultipleColumns + (nextColumnStep * index);
}

GetData(r)
{
  return r;
}

}

@Component({
  selector: 'ngx-fs-icon',
  template: `
   <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    <button (click)="goToPage('compound-list')" nbButton outline status="success">View Compounds</button>
    </ng-template>
    `,
})
export class FsIconComponent {
 @Input() CategoryChildren;
 @Input() expanded: boolean;
 nbButton: NbButton ;
 constructor(private router: Router){
}
 isDir(): boolean {
   //debugger;
  return this.CategoryChildren.children !== undefined;
}
 goToPage(pageName: string){
  this.router.navigate([compoundUrls.compoundListPage], { queryParams: { Catogeryid : this.CategoryChildren.data.idCompoundCategory}});
}

}
