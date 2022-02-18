import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCatId: number;
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listProducts();

    this.route.paramMap.subscribe(()=>{
    this.listProducts();
    });
  }

  listProducts() {
    //check if id param is available
    const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id');
    if(hasCategoryId) {
      //get the id param string. convert string to a number using '+' symbol
      this.currentCatId= +this.route.snapshot.paramMap.get('id');
    }
    else 
    {
      this.currentCatId=1;
    }
    this.productService.getProductList(this.currentCatId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
