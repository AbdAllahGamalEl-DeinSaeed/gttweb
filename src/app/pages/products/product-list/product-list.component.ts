import { ProductDetailsDTO } from './../../../@core/Models/DTO/ProductDetailsDTO';
import { Products_ProductHierarchyDTO } from './../../../@core/Models/DTO/ProductHierarchy';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';


@Component({
  selector: 'ngx-Product-List',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  categoryid: string;
  productsList: Products_ProductHierarchyDTO[];
  productDetails? : ProductDetailsDTO;
  constructor(private route: ActivatedRoute ,  private httpServices: HTTPService,)
  {

  }

  ngOnInit(): void {

       this.categoryid = this.route.snapshot.queryParamMap.get('Catogeryid');
       this.getProductList(this.categoryid)  ;
    }

    getProductList(id: string )
    {
      // tslint:disable-next-line: max-line-length
      const request = 'https://localhost:44375/api/Definitions/getproducts_producthierarchy';
      this.httpServices.Get(request ,{productCategoryId: id}).subscribe((response: Products_ProductHierarchyDTO[]) =>
      {
        this.productsList = response ;
        console.log(this.productsList);

      });
    }

    getProduct(id: string )
    {
      const request = 'https://localhost:44375/api/Definitions/getproduct';
      this.httpServices.Get(request , {productId: id}).subscribe((response :ProductDetailsDTO)=>
      {this.productDetails = response});
      console.log(this.productDetails.idProduct);
    }

    updateProduct(product:ProductDetailsDTO)
    {
      const request = 'https://localhost:44375/api/Definitions/updateProduct';
      // debugger;
      this.httpServices.Post(request ,{},product).subscribe((response :any)=>
      {
       console.log("response",response);
      });
    }
  }


