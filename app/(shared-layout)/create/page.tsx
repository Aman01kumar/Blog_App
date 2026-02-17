"use client"

import { creatBlogAction } from "@/app/action";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateRout () {

    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            image: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof postSchema>){
        startTransition(async  () => {
            console.log('het this run ont he client side')
            await creatBlogAction(values);
        })
    }

    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create post</h1>
                <p className="text-xl text-muted-foreground py-4">Share your thoughts</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-6">
                            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="title of your blog post"  {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>
                        )} />

                         <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea aria-invalid={fieldState.invalid} placeholder="Share your though"  {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>
                        )} />

                         <Controller name="image" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Image</FieldLabel>
                                <Input 
                                aria-invalid={fieldState.invalid} 
                                placeholder="Share your thought" 
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    field.onChange(file)
                                }}
                                
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>
                        )} />

                        <Button disabled={isPending} className="mt-2">{isPending  ? (
                        <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Loading...</span>
                        </>
                         ) : (
                            <span>Create Post</span>
                        )}</Button>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}