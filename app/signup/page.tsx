import React from 'react';
"use client"

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signUp("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign Up</button>
    </form>
  )
}