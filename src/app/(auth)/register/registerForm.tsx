'use client'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RegisterBody, RegisterBodyType} from "@/app/schemaValidations/auth.schema";
import {envConfig} from "@/app/config";

export default function RegisterForm() {
    const formSchema = z.object({
        username: z.string().min(2).max(50),
    })
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name:'',
            password:'',
            confirmPassword: ''
    }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
            const result=await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,{
                body : JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(res=>res.json())
        console.log(result);
    }

    return <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Tên</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>

                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} type="email" />
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
                            <Input placeholder="shadcn" {...field} type="password" />
                        </FormControl>

                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} type="password" />
                        </FormControl>

                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit" className="!mt-10 w-full">Đăng ký</Button>
        </form>
    </Form>
}