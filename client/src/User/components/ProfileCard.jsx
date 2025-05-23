import React from "react";

export default function ProfileCard({ userInfoCore, userAddress }) {
  return (
    <div className="profile-card">
      <p><strong>First Name:</strong> {userInfoCore.firstName}</p>
      <p><strong>Last Name:</strong> {userInfoCore.lastName}</p>
      <p><strong>Email:</strong> {userInfoCore.email}</p>
      <p><strong>Street:</strong> {userAddress.street}</p>
      <p><strong>City:</strong> {userAddress.city}</p>
      <p><strong>State:</strong> {userAddress.state}</p>
      <p><strong>Zip:</strong> {userAddress.zip}</p>
      <p><strong>Country:</strong> {userAddress.country}</p>
    </div>
  );
}
