import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { DocumentReference, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Category } from '../../../models/category/index';
import { CategoryType } from '../../../models/categoryType/indext';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  categories: Category[] = []
  constructor(
    private categoryServices: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories()
  }
  getCategories() {
    return this.categoryServices
      .getCategories()
      .snapshotChanges()
      .subscribe(async (snapshot) => {
        const categoriesParse = snapshot.map((item) => {
          return this.parseData(item.payload.doc)
        })

        this.categories = await Promise.all(categoriesParse)
      })
  }
  async parseData(query: QueryDocumentSnapshot<Category>): Promise<Category> {
    const category = query.data() as any
    const typeData = await (category.type as DocumentReference).get()
    const categoryType = (typeData.data() as CategoryType)

    return {
      ...category,
      createAt: category.createAt.toDate(),
      updateAt: category.updateAt.toDate(),
      type: categoryType,
      reference: query.ref
    }
  }

  deleteCategory(selectedCategory: Category) {
    console.log(selectedCategory.reference?.path!)
    this.categoryServices.deleteCategory(selectedCategory.reference?.path!)
  }
}
