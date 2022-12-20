
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import '/node_modules/primeflex/primeflex.css'
import { useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from '@firebase/firestore'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit } = useForm()
    const userData = collection(firestore, 'users')

    const onSubmit = (data: any) => {
        console.log(data)
        try {
            addDoc(userData, data)
        } catch {
            console.log('An error occured')
        }
    }

    return <>
        <div className='grid'>
            <div className='col-6 col-offset-3'>
                <Card title='Login'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='p-fluid formgrid grid'>
                            <div className='field col-12'>
                                <span className="p-float-label">
                                    <InputText id="firstname" {...register('firstname')} />
                                    <label htmlFor="firstname">Firstname</label>
                                </span>
                            </div>
                            <div className='field col-12'>
                                <span className="p-float-label">
                                    <InputText id="lastname" {...register('lastname')} />
                                    <label htmlFor="lastname">Lastname</label>
                                </span>
                            </div>
                        </div>
                        <Button
                            label="Save"
                            type="submit"
                            style={{ float: "right" }}
                            className="p-button-outlined mt-2"
                        />
                    </form>
                </Card>
            </div>
        </div>
    </>
}