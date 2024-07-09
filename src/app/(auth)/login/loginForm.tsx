'use client'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoginBody, LoginBodyType, RegisterBody, RegisterBodyType} from "@/app/schemaValidations/auth.schema";
import {envConfig} from "@/app/config";
import {useToast} from "@/components/ui/use-toast";

export default function LoginForm() {
    const {toast} = useToast();
    const formSchema = z.object({
        username: z.string().min(2).max(50),
    })
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    payload
                }
                if (!res.ok) {
                    throw data
                }
                return data
            })
        } catch (error:any) {
            const errors = (error as any).payload.erros as { field: string, message: string }[]
            const status = error.status as number
            if(status===422){
                errors.forEach((error)=>{
                    form.setError(error.field as ('email' | 'password'), {
                        type :'server',
                        message: error.message
                    })
                })
            }else{
                toast({
                    title: 'Đã có lỗi xảy ra',
                    description: error.payload.message,

                })
            }
        }

    }

    return <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full">

            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} type="email"/>
                        </FormControl>

                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} type="password"/>
                        </FormControl>

                        <FormMessage/>
                    </FormItem>
                )}
            />

            <Button type="submit" className="!mt-10 w-full">Đăng nhập</Button>
        </form>
    </Form>
}