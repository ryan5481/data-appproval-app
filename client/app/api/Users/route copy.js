import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json()
        const userData = body.formData

        //CONFIRM DATA IS RECEIVED
        if (!userData.email || !userData.passWord) {
            return NextResponse.json({ message: "All fields are required.", err }, { status: 400 })
        }

        // CHECK FOR DUPLICATE USERS
        const duplicate = await User.findOne({ email: userData.email.toLowerCase() })
            .lean()
            .exec()
        if (duplicate) {
            return NextResponse.json({ message: "Email exists.", err }, { status: 409 })
        }
        // ENCRYPT PASSWORD
        const hashPassword = await bcrypt.hash(userData.password, 100)
        userData.password = hashPassword
        // SAVE TO DATA
        const data = await User.create(userData)
        // if (!data) {
        //     console.log(err)
        //     return NextResponse.json({ message: "Error", err }, { status: 500 })
        // }
        return NextResponse.json({ message: "User created", err }, { status: 201 })

    } catch (error) {
        console.log(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}