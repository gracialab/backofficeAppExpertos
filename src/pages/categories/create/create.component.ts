import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { QuerySnapshot } from '@angular/fire/compat/firestore';
import { CategoryType } from '../../../models/categoryType/indext';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../models/category/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  formCategory!: FormGroup;
  categoryType: CategoryType[] = []
  selectedCategoryType?: CategoryType
  selectedCategory?: Category
  titulo = "Agregar Categoria"

  constructor(
    private categoryServices: CategoryService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
  ) {
    this.formCategory = this.fb.group({
      description: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      active: new FormControl('')
    })
  }

  ngOnInit() {
    this.getCategoryType()
    this.aRoute.params.subscribe((params: Params) => {
      const id = params['id']

      if (id) {
        this.getDetailCategory(id)
      }
    })
  }

  getDetailCategory(id: string) {
    this.titulo = "Editar Categoria"
    this.categoryServices.getDetailCategory(id).get().subscribe((snapshot) => {
      const category: Category = snapshot.data()!
      const indexTypeCategory = this.categoryType.findIndex((categoryType) => {
        const type: any = category.type
        return categoryType.reference?.id == type?.id
      })
      console.log(indexTypeCategory)
      this.formCategory.setValue({
        "name": category.name,
        "description": category.description,
        "type": indexTypeCategory,
        "active": category.active
      })
      this.selectedCategory = { ...category, reference: snapshot.ref }
    })

  }

  createCategory() {
    const indexSelected = this.formCategory.value.type
    const categoryType = this.categoryType[indexSelected]
    const category: Object = {
      active: this.formCategory.value.active? true: false,
      description: this.formCategory.value.description,
      createAt: new Date(),
      name: this.formCategory.value.name,
      type: categoryType.reference,
      updateAt: new Date()
    }
    this.categoryServices.createCategory(category).then(() => {
      this.formCategory.reset()
    }, error => {
      console.log(error)
    })
  }

  getCategoryType() {
    var categoriesObservable = this.categoryServices.getCategoryType().get().subscribe(async snapshot => {
      const categoryTypeParse = this.parseData(snapshot)
      this.categoryType = await Promise.all(categoryTypeParse)
      categoriesObservable.unsubscribe()
    })
  }

  parseData(snapshot: QuerySnapshot<any>): Promise<CategoryType>[] {
    return snapshot.docs.map(async (data) => {
      const values = data.data() as any
      return {
        ...values,
        reference: data.ref
      } as CategoryType
    })
  }

  validateAction() {
    this.selectedCategory ? this.updateCategory() : this.createCategory()
  }

  updateCategory() {
    const indexSelected = this.formCategory.value.type
    const categoryType = this.categoryType[indexSelected]
    const category: Object = {
      active: this.formCategory.value.active? true: false,
      description: this.formCategory.value.description,
      name: this.formCategory.value.name,
      type: categoryType.reference,
      updateAt: new Date()
    }
    this.categoryServices.updateCategory(this.selectedCategory?.reference?.id!, category).then(() => {
      this.formCategory.reset()
    }, error => {
      console.log(error)
    })
  }
}
