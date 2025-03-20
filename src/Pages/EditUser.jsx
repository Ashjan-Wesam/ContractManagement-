import React from 'react'
import "../assets/css/userprofile.css"

export default function EditUser() {
  return (
    <div class="container rounded bg-white mt-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90"/><span class="font-weight-bold">John Doe</span><span class="text-black-50">john_doe12@bbb.com</span><span>United States</span></div>
        </div>
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6>Back to home</h6>
                    </div>
                    <h6 class="text-right">Edit Profile</h6>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="first name" value="John"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="Doe" placeholder="Doe"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Email" value="john_doe12@bbb.com"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="+19685969668" placeholder="Phone number"/></div>
                </div>
                
                <div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button">Save Profile</button> <button class="btn btn-danger profile-delete " type="button">Delete Profile</button></div>
                <div class="mt-5 text-right"></div>
            </div>
        </div>
    </div>
</div>
  )
}
