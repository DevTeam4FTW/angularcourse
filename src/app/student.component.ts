// import { Component, OnInit } from '@angular/core';
// import { StudentService } from 'src/app/shared/student.service';
// import { NgForm, Form } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css']
// })
// export class StudentComponent implements OnInit {

//   constructor(private studentservice:StudentService,private firestore:AngularFirestore,private toastr:ToastrService) { }

//   ngOnInit() {
//     this.resetForm();
//   }

//   resetForm(form? : NgForm){
//     if(form != null){
//       form.resetForm();
//     }
//       this.studentservice.formData = {
//         id:null,
//         fullName:'',
//         RollNo:'',
//         mobile:null,
//         Course:''
  
//       }
    
   
//   }
//   onSubmit(form:NgForm){
//     let data = Object.assign({}, form.value);
//     delete data.id;
//     if(form.value.id == null){
//       this.firestore.collection("Students").add(data);
//     }
//     else
//       this.firestore.doc('Students/'+form.value.id).update(data);
//     this.resetForm();
//     this.toastr.success('Registration succesfull','student register');
    
    

//   }
// }


import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { NgForm, Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  private studentform:FormGroup;
  

  constructor(private fb:FormBuilder,private studentservice:StudentService,private firestore:AngularFirestore,private toastr:ToastrService) {
    this.createForm();
   }

  ngOnInit() {
    this.resetForm();
  }
  
  createForm() {
    this.studentform = this.fb.group({
      id: [''],
      fullName: ['',Validators.required],
      RollNo: ['',Validators.required],
      mobile: ['',Validators.required],
      Course: ['',Validators.required]
    });
  }

  resetForm(studentform? : NgForm){
    if(studentform != null){
      studentform.resetForm();
    }
      this.studentservice.formData = {
        id:null,
        fullName:'',
        RollNo:'',
        mobile:null,
        Course:''
  
      }
    
   
  }
  onSubmit(studentform:NgForm){
    let data = Object.assign({}, studentform.value);
    console.log(data);
    delete data.id;
    if(studentform.value.id == null){
      this.firestore.collection("Students").add(data);
      console.log("if")
    }
    else{
      this.firestore.doc('Students/'+studentform.value.id).update(data);
      console.log("else");
    }
      
    this.resetForm();
    this.toastr.success('Registration succesfull','student register');
    
    

  }

  //function using formcontrolName and formGroup
  try(value){
   // console.log(this.studentform.get("fullName").value);
   // console.log(this.studentservice.formData.fullName);
   console.log(value);
   let data = Object.assign({}, value);
    console.log(data);
    delete data.id;
    if(value.id == null){
      this.firestore.collection("Students").add(data);
      console.log("if")
    }
    else{
      this.firestore.doc('Students/'+value.id).update(data);
      console.log("else");
    }
      
    this.resetForm();
    this.toastr.success('Registration succesfull','student register');

  }
}




