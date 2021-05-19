import { CompoundDetailsDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO';
import { Compounds_CompoundHierarchyDTO, CompoundMembers_CompoundHierarchyDTO, Products_CompoundHierarchyDTO } from './../../../@core/Models/DTO/CompoundHierarchyDTO';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,NbButton } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Injectable()
export class ProductListService {
  productsList : Products_CompoundHierarchyDTO[];

  AssignProductList(responseList : Products_CompoundHierarchyDTO[])
  {
    this.productsList = responseList;
  }

}

@Component({
  selector: 'ngx-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.scss']
})
export class CompoundListComponent implements OnInit {

  categoryid: any;
  compoundId: number;
  compoundsList: Compounds_CompoundHierarchyDTO[];
  compoundDetails? : CompoundDetailsDTO;
  customColumn = 'name';
  defaultColumns = ['idCompoundMember'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CompoundMembers_CompoundHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  public CompoundMembers: CompoundMembers_CompoundHierarchyDTO[] = [];
  private data: TreeNode<CompoundMembers_CompoundHierarchyDTO>[] ;

  constructor(private route: ActivatedRoute,
      private httpServices: HTTPService,
      private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundMembers_CompoundHierarchyDTO>,
      public productListService :ProductListService)
  {

  }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.queryParamMap.get('Catogeryid');
    this.GetCompoundList(this.categoryid)  ;
    this.compoundId = 320;
  }

  GetCompoundList(id: any )
  {
    console.log(id);
    const request = 'https://localhost:44375/api/Definitions/getcompounds_compoundhierarchy';
    this.httpServices.Get(request ,{compoundCategoryId: id}).subscribe((response: Compounds_CompoundHierarchyDTO[]) =>
    {
      this.compoundsList = response ;
      console.log(this.compoundsList);
    });
  }

  GetCompound(id: number )
    {
      const request = 'https://localhost:44375/api/Definitions/getcompound';
      this.httpServices.Get(request , {compoundId: id}).subscribe((response :CompoundDetailsDTO)=>
      {this.compoundDetails = response});
      this.GetCompoundMemberList(()=>{
        // debugger;
       this.dataSource=this.dataSourceBuilder.create(this.data);
       console.log(this.dataSource);
      }, id);
    }

  GetCompoundMemberList(callbackFun, id)
  {
    console.log("called")
    const request = 'https://localhost:44375/api/Definitions/getcompoundmembers_compoundhierarchy';
    this.httpServices.Get(request, {compoundId : id}).subscribe((CompoundMembers:  TreeNode<CompoundMembers_CompoundHierarchyDTO>[]) =>
    {
      this.data = this.MapData(CompoundMembers);
      console.log("data",this.data);
      callbackFun();
     }) ;
     return this.data ;
  }

  MapData(res){
    let  mappedData=[];
    res.forEach(element => {
      mappedData.push(this.mapObj(element))
    });
    return mappedData ;
  }

  mapObj(_obj){
    let x={ data: { name:"",idCompoundMember:""},children:[]}
     x=this.mapObjData(_obj);

     x.children= _obj.compoundMembersChildren?.map(a=>this.mapObjData(a) )
     console.log(x);
     return x
   }

   mapObjData(_obj){
    let x={ data: { name:"",idCompoundMember:""},children:[]}
    x.data.name= _obj.name
    x.data.idCompoundMember=_obj.idCompoundMember;
    // debugger;
     if(_obj.compoundMembersChildren?.length > 0 ){   x.children= _obj.compoundMembersChildren?.map(a=>this.mapObj(a) ) ;}
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

}

@Component({
  selector: 'ngx-fs-icon-compound-list',
  template: `
   <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    <button (click)="GetProductList()" nbButton outline status="primary">View Products</button>
    </ng-template>
    `,
})

export class FsIconCompoundListComponent {
 @Input() CategoryChildren;
 @Input() expanded: boolean;
 nbButton: NbButton ;

 constructor(private httpServices: HTTPService, public productListService : ProductListService){  }

 isDir(): boolean
 {
   //debugger;
  return this.CategoryChildren.children !== undefined;
 }

 GetProductList(){
  console.log(this.CategoryChildren.data.idCompoundMember);
  const request = 'https://localhost:44375/api/Definitions/getproducts_compoundhierarchy';
  this.httpServices.Get(request ,{compoundMemberId: this.CategoryChildren.data.idCompoundMember}).subscribe((response: Products_CompoundHierarchyDTO[]) =>
  {
    console.log(response);
    this.productListService.AssignProductList(response);
    console.log(this.productListService);
  });
}

}
