"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const programSchema = z.object({
    name: z.string().min(1, "Program name is required"),
    description: z.string().optional(),
    mode: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    fees: z.string().optional(),
    eligibility: z.object({
        ugBackground: z.string().optional(),
        minimumGpa: z.string().optional(),
        backlogs: z.number().optional(),
        workExperience: z.string().optional(),
        allow3YearDegree: z.string().optional(),
        decisionFactor: z.string().optional(),
    }).optional(),
    ranking: z.string().optional(),
    university: z.string().min(1, "University is required"),
    college: z.string().optional(),
    location: z.string().optional(),
    publicPrivate: z.string().optional(),
    specialLocationFeatures: z.string().optional(),
    specialUniversityFeatures: z.string().optional(),
    specialization: z.string().optional(),
    usp: z.string().optional(),
    curriculum: z.string().optional(),
    coOpInternship: z.string().optional(),
    transcriptEvaluation: z.string().optional(),
    lor: z.string().optional(),
    sop: z.string().optional(),
    interviews: z.string().optional(),
    applicationFee: z.string().optional(),
    deposit: z.string().optional(),
    depositRefundableVisa: z.string().optional(),
    keyCompaniesHiring: z.string().optional(),
    keyJobRoles: z.string().optional(),
    quantQualitative: z.string().optional(),
});

export async function createProgram(formData: FormData) {
    try {
        const program = await prisma.program.create({
            data: {
                name: formData.get('name') as string,
                description: formData.get('description') as string || "",
                mode: formData.get('mode') as string || "",
                duration: formData.get('duration') as string || "",
                category: formData.get('category') as string || "",
                fees: formData.get('fees') as string || "",
                eligibility: JSON.stringify({
                    ugBackground: formData.get('ugBackground') as string || "",
                    minimumGpa: formData.get('minimumGpa') as string || "",
                    backlogs: Number(formData.get('backlogs')) || 0,
                    workExperience: formData.get('workExperience') as string || "",
                    allow3YearDegree: formData.get('allow3YearDegree') as string || "",
                    decisionFactor: formData.get('decisionFactor') as string || "",
                }),
                ranking: formData.get('ranking') as string || "",
                university: formData.get('university') as string,
                college: formData.get('college') as string || "",
                location: formData.get('location') as string || "",
                publicPrivate: formData.get('publicPrivate') as string || "",
                specialLocationFeatures: formData.get('specialLocationFeatures') as string || "",
                specialUniversityFeatures: formData.get('specialUniversityFeatures') as string || "",
                specialization: formData.get('specialization') as string || "",
                usp: formData.get('usp') as string || "",
                curriculum: formData.get('curriculum') as string || "",
                coOpInternship: formData.get('coOpInternship') as string || "",
                transcriptEvaluation: formData.get('transcriptEvaluation') as string || "",
                lor: formData.get('lor') as string || "",
                sop: formData.get('sop') as string || "",
                interviews: formData.get('interviews') as string || "",
                applicationFee: formData.get('applicationFee') ? String(formData.get('applicationFee')) : null,
                deposit: formData.get('deposit') ? String(formData.get('deposit')) : null,
                depositRefundableVisa: formData.get('depositRefundableVisa') as string || "",
                keyCompaniesHiring: formData.get('keyCompaniesHiring') as string || "",
                keyJobRoles: formData.get('keyJobRoles') as string || "",
                quantQualitative: formData.get('quantQualitative') as string || "",
            },
        });

        revalidatePath('/admin/dashboard');
        return { success: true, program };
    } catch (error) {
        console.error('Error creating program:', error);
        return { success: false, error: 'Failed to create program' };
    }
}

export async function updateProgram(id: string, formData: FormData) {
    console.log('Starting program update for ID:', id);
    try {
        // Helper function to handle "Not Specified" values
        const getFormValue = (key: string) => {
            const value = formData.get(key);
            return value === 'Not Specified' ? null : (value as string || "");
        };

        const program = await prisma.program.update({
            where: { id: parseInt(id, 10) },
            data: {
                name: formData.get('name') as string,
                description: getFormValue('description'),
                mode: getFormValue('mode'),
                duration: getFormValue('duration'),
                category: getFormValue('category'),
                fees: getFormValue('fees'),
                eligibility: JSON.stringify({
                    ugBackground: getFormValue('ugBackground'),
                    minimumGpa: getFormValue('minimumGpa'),
                    backlogs: Number(getFormValue('backlogs')) || 0,
                    workExperience: getFormValue('workExperience'),
                    allow3YearDegree: getFormValue('allow3YearDegree'),
                    decisionFactor: getFormValue('decisionFactor'),
                }),
                ranking: getFormValue('ranking'),
                university: formData.get('university') as string,
                college: getFormValue('college'),
                location: getFormValue('location'),
                publicPrivate: getFormValue('publicPrivate'),
                specialLocationFeatures: getFormValue('specialLocationFeatures'),
                specialUniversityFeatures: getFormValue('specialUniversityFeatures'),
                specialization: getFormValue('specialization'),
                usp: getFormValue('usp'),
                curriculum: getFormValue('curriculum'),
                coOpInternship: getFormValue('coOpInternship'),
                transcriptEvaluation: getFormValue('transcriptEvaluation'),
                lor: getFormValue('lor'),
                sop: getFormValue('sop'),
                interviews: getFormValue('interviews'),
                applicationFee: getFormValue('applicationFee'),
                deposit: getFormValue('deposit'),
                depositRefundableVisa: getFormValue('depositRefundableVisa'),
                keyCompaniesHiring: getFormValue('keyCompaniesHiring'),
                keyJobRoles: getFormValue('keyJobRoles'),
                quantQualitative: getFormValue('quantQualitative'),
            },
        });

        console.log('Program updated successfully:', program);
        revalidatePath('/admin/dashboard');
        return { success: true, program };
    } catch (error) {
        console.error('Error updating program:', error);
        return { success: false, error: 'Failed to update program' };
    }
}