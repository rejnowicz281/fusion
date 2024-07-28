"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useBaseForm = ({
    schema,
    defaultValues
}: {
    schema: z.ZodObject<any, any, any>;
    defaultValues?: Record<string, string>;
}) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues
    });

    const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        form.handleSubmit(
            () => {}, // valid - submit further
            () => e.preventDefault() // invalid - don't submit further
        )();
    };

    return { form, onSubmitClick };
};

export default useBaseForm;
