import { Component, OnInit } from '@angular/core';
import { NgForm, Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {StudentService} from '../core/student.service';
import { Student } from '../core/student.model';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  
  students:Student[];
  studentform:FormGroup;
  
  constructor(private fb:FormBuilder,private studentservice:StudentService,private firestore:AngularFirestore) {
    this.createForm();
   }

  ngOnInit() {
   // this.resetForm();
   this.displayStudents();
    
  }

  createForm() {
   this.studentform = this.fb.group({
     id:[null],
     fullName:['',Validators.required],
     RollNo:['',Validators.required],
     mobile:[null,Validators.required],
     Course:['',Validators.required]

   })
  }

  // resetForm(form? : NgForm){
  //   if(form != null){
  //     form.resetForm();
  //   }
  //     this.studentservice.formData = {
  //       id:null,
  //       fullName:'',
  //       RollNo:'',
  //       mobile:null,
  //       Course:''
  
  //     }
    
   
  // }
//   onSubmit(form:NgForm){
//     let data = Object.assign({}, form.value);
//     delete data.id;
    
//     if(form.value.id == null){
//       this.firestore.collection("Students").add(data);
//       console.log(data)
//     }
//     else
//       this.firestore.doc('Students/'+form.value.id).update(data);
//     this.resetForm();
//    // this.toastrservice.success('Registration succesfull','student register');
//  }

  try(value){
    let data = Object.assign({}, value);
    delete data.id;
    
    if(value.id == null){
      this.firestore.collection("Students").add(data);
      console.log(data)
    }
    else
      this.firestore.doc('Students/'+value.id).update(data);
    this.createForm();
   // this.toastrservice.success('Registration succesfull','student register');
 }

 displayStudents(){
   
  this.studentservice.getStudents().subscribe(resArray =>{
    this.students = resArray.map(item => {
      return{
        id:item.payload.doc.id,
      ...item.payload.doc.data()
      } as Student;
    });
  });
 }

 onEdit(std:Student){
  this.studentservice.formData = Object.assign({}, std);
}
onDelete(id:string){
  //window.alert("yes");
  if (confirm("Are you sure to delete this record?")) {
    this.firestore.doc('Students/' + id).delete();
    //this.toastr.warning('Deleted successfully','Strdent. Register');
  }
  this.createForm();
}

}
