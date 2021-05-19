import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductCategories_ProductHierarchyDTO } from './../../../@core/Models/DTO/ProductHierarchy';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,NbButton } from '@nebular/theme';
import { Console } from 'console';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}


@Component({
  selector: 'ngx-ProductCategoryList',
  templateUrl: './ProductCategoryList.component.html',
  styleUrls: ['./ProductCategoryList.component.scss']
})
export class ProductCategoryListComponent{

  customColumn = 'name';
  defaultColumns = ['productCategoryId'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<ProductCategories_ProductHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  public ProductCategories: ProductCategories_ProductHierarchyDTO[] = [];
  private data: TreeNode<ProductCategories_ProductHierarchyDTO>[] ;

  constructor(
    private httpServices: HTTPService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductCategories_ProductHierarchyDTO>,
    private router :Router
    )
 {
   //this.data = this.GetProductCategoryList();
   this.GetProductCategoryList(()=>{
     // debugger;
    this.dataSource=this.dataSourceBuilder.create(this.data);
    console.log(this.dataSource);
   })

 }

  GetProductCategoryList(callbackFun)
 {
  const request = 'https://localhost:44375/api/Definitions/getprodcutcategories_producthierarchy?platformId=1';
  // tslint:disable-next-line: deprecation
  this.httpServices.Get(request).subscribe((ProductCategories: TreeNode<ProductCategories_ProductHierarchyDTO>[])=>
  // tslint:disable-next-line: no-console
  {
   this.data = this.MapData(ProductCategories);
   console.log("data",this.data);
   callbackFun();
  }) ;
  return this.data ;
 }
 MapData(res){let  mappedData=[];
  res.forEach(element => {
    mappedData.push(this.mapObj(element))
  });

return mappedData ;

 }
 mapObj(_obj){
  let x={ data: { name:"",productCategoryId:""},children:[]}
   x=this.mapObjData(_obj);

   x.children= _obj.productCategoriesChildren?.map(a=>this.mapObjData(a) )
   return x

 }
 mapObjData(_obj){
  let x={ data: { name:"",productCategoryId:""},children:[]}
  x.data.name= _obj.name
  x.data.productCategoryId=_obj.productCategoryId;
  // debugger;
   if(_obj.productCategoriesChildren?.length > 0 ){   x.children= _obj.productCategoriesChildren?.map(a=>this.mapObj(a) ) ;}
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
GetData(r){
  console.log(r);
return r
}

DefineProductPage()
{
  this.router.navigate(['/pages/products/new-product-form']);
}
}


@Component({
  selector: 'ngx-fs-icon',
  template: `
   <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    <button (click)="goToPage('product-list')" nbButton outline status="success">Show Products</button>
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
  this.router.navigate(['/pages/products/product-list'], { queryParams: { Catogeryid : this.CategoryChildren.data.productCategoryId}});
}


}



