import { useState } from "react";
import { useNavigate } from "react-router";
import {
    useForm,
    useFieldArray,
    useWatch,
    type Control,
    type FieldErrors,
    type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, ArrowLeft, GripVertical, AlertCircle, Shield, Globe, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { createPoll } from "../api";
import { getApiErrorMessage } from "../../../shared/lib/api";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../shared/components/Card";

const optionSchema = z.object({
    value: z.string().min(1, "Option text is required"),
});

const questionSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    isRequired: z.boolean(),
    options: z.array(optionSchema).min(2, "At least 2 options are required"),
});

const pollSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        responseAccess: z.enum(["anonymous", "authenticated"]),
        expiresAt: z
            .string()
            .min(1, "Expiry date is required")
            .refine((value) => new Date(value).getTime() > Date.now(), {
                message: "Expiry date must be in the future",
            }),
        questions: z
            .array(questionSchema)
            .min(1, "At least 1 question is required"),
    })
    .refine(
        (data) => {
            return data.questions.some((q) => q.isRequired);
        },
        {
            message: "At least one question must be required",
            path: ["questions"],
        },
    );

type PollFormValues = z.infer<typeof pollSchema>;

export default function CreatePollPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PollFormValues>({
        resolver: zodResolver(pollSchema),
        defaultValues: {
            title: "",
            description: "",
            responseAccess: "anonymous",
            expiresAt: tomorrow.toISOString().split("T")[0] + "T12:00",
            questions: [
                {
                    text: "",
                    isRequired: true,
                    options: [{ value: "" }, { value: "" }],
                },
            ],
        },
    });

    const {
        fields: questions,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        name: "questions",
        control,
    });

    const responseAccess = useWatch({ control, name: "responseAccess" });

    const onSubmit = async (data: PollFormValues) => {
        try {
            setIsSubmitting(true);
            const payload = {
                title: data.title,
                description: data.description ? data.description : undefined,
                responseAccess: data.responseAccess,
                expiresAt: new Date(data.expiresAt).toISOString(),
                questions: data.questions.map((q) => ({
                    text: q.text,
                    isRequired: q.isRequired,
                    options: q.options.map((o) => o.value),
                })),
            };

            await createPoll(payload);
            toast.success("Poll created successfully!", {
                description: "Your poll is now live and ready to share.",
            });
            navigate(`/dashboard`);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create poll"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Header */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-white/40 hover:text-white hover:bg-white/5"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Create a New Poll
                </h1>
                <p className="text-[#64748b]">
                    Design engaging questions and configure your poll settings.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* General Settings */}
                <Card className="border-white/[0.06] bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center border border-[#6366f1]/20">
                                <Globe className="w-4 h-4 text-[#818cf8]" />
                            </div>
                            <CardTitle className="text-lg">General Settings</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white/70">
                                Poll Title <span className="text-red-400">*</span>
                            </label>
                            <Input
                                placeholder="E.g., What's your favorite programming language?"
                                {...register("title")}
                                error={errors.title?.message}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white/70">
                                Description <span className="text-white/30">(Optional)</span>
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder="Provide context or instructions for your respondents"
                                rows={3}
                                className="flex w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/40 focus-visible:border-[#6366f1]/30 transition-all resize-none hover:border-white/15"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">
                                    Access Control
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("responseAccess")}
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/40 transition-all appearance-none cursor-pointer hover:border-white/15"
                                    >
                                        <option value="anonymous" className="bg-[#0f0f14]">
                                            Anonymous (Anyone with link)
                                        </option>
                                        <option value="authenticated" className="bg-[#0f0f14]">
                                            Authenticated (Sign in required)
                                        </option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        {responseAccess === "authenticated" ? (
                                            <Shield className="w-4 h-4 text-[#818cf8]" />
                                        ) : (
                                            <Globe className="w-4 h-4 text-[#22d3ee]" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">
                                    Expiry Date & Time
                                </label>
                                <Input
                                    type="datetime-local"
                                    {...register("expiresAt")}
                                    error={errors.expiresAt?.message}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Questions Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#ec4899]/10 flex items-center justify-center border border-[#ec4899]/20">
                                <AlertCircle className="w-4 h-4 text-[#f472b6]" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Questions</h2>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                appendQuestion({
                                    text: "",
                                    isRequired: true,
                                    options: [{ value: "" }, { value: "" }],
                                })
                            }
                            className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Question
                        </Button>
                    </div>

                    {errors.questions?.message && (
                        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {errors.questions.message}
                        </div>
                    )}

                    {questions.map((question, qIndex) => (
                        <QuestionEditor
                            key={question.id}
                            qIndex={qIndex}
                            control={control}
                            register={register}
                            removeQuestion={() => removeQuestion(qIndex)}
                            errors={errors}
                        />
                    ))}
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-6 border-t border-white/[0.06]">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto btn-primary h-12 px-8 shadow-lg shadow-[#6366f1]/20"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Creating Poll...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                Create Poll
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

interface QuestionEditorProps {
    qIndex: number;
    control: Control<PollFormValues>;
    register: UseFormRegister<PollFormValues>;
    removeQuestion: () => void;
    errors: FieldErrors<PollFormValues>;
}

function QuestionEditor({
    qIndex,
    control,
    register,
    removeQuestion,
    errors,
}: QuestionEditorProps) {
    const {
        fields: options,
        append: appendOption,
        remove: removeOption,
    } = useFieldArray({
        name: `questions.${qIndex}.options` as const,
        control,
    });

    return (
        <Card className="border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6366f1]/60 via-[#ec4899]/40 to-transparent" />

            <div className="absolute top-4 right-4">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeQuestion}
                    className="text-white/20 hover:text-red-400 hover:bg-red-500/10 w-8 h-8 p-0"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <CardContent className="pt-6 pl-7 space-y-5">
                <div className="pr-10">
                    <label className="block text-sm font-medium mb-2 text-white/70">
                        Question {qIndex + 1} <span className="text-red-400">*</span>
                    </label>
                    <Input
                        placeholder="What would you like to ask your audience?"
                        {...register(`questions.${qIndex}.text` as const)}
                        error={errors?.questions?.[qIndex]?.text?.message}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id={`req-${qIndex}`}
                        {...register(`questions.${qIndex}.isRequired` as const)}
                        className="w-4 h-4 rounded border-white/20 bg-white/[0.03] text-[#6366f1] focus:ring-[#6366f1]/40 cursor-pointer"
                    />
                    <label htmlFor={`req-${qIndex}`} className="text-sm text-white/60 cursor-pointer select-none">
                        Required question
                    </label>
                </div>

                <div className="space-y-3 pt-2">
                    <label className="block text-sm font-medium text-white/50 flex items-center gap-2">
                        <GripVertical className="w-3.5 h-3.5" />
                        Answer Options
                    </label>
                    {options.map((option, oIndex) => (
                        <div key={option.id} className="flex items-start gap-2">
                            <div className="flex items-center justify-center w-8 h-11 text-xs text-white/30 font-mono flex-shrink-0">
                                {String.fromCharCode(65 + oIndex)}
                            </div>
                            <div className="flex-1">
                                <Input
                                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                    {...register(
                                        `questions.${qIndex}.options.${oIndex}.value` as const,
                                    )}
                                    error={
                                        errors?.questions?.[qIndex]?.options?.[
                                            oIndex
                                        ]?.value?.message
                                    }
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(oIndex)}
                                disabled={options.length <= 2}
                                className="mt-1 text-white/20 hover:text-red-400 hover:bg-red-500/10 w-8 h-8 p-0 disabled:opacity-20"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {errors?.questions?.[qIndex]?.options?.message && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.questions[qIndex]?.options?.message}
                        </p>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendOption({ value: "" })}
                        className="text-sm text-[#818cf8] hover:text-[#a5b4fc] hover:bg-[#6366f1]/10 ml-8"
                    >
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        Add Option
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}