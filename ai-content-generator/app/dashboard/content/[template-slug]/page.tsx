"use client"
import React, { useContext, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import moment from 'moment'
import { ArrowLeft } from 'lucide-react'
import { chatSession } from '@/utils/AiModal'

import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'

import FormSection from '../_component/FormSection'
import OutputSection from '../_component/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'

import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'

const CreateNewContent = () => {
    const params = useParams();
    const templateSlug = params['template-slug'];
    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == templateSlug);

    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

    const { user } = useUser();
    const router = useRouter();

    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAiPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAiPrompt);
        const aiResponse = await result?.response.text();
        setAiOutput(aiResponse || '');
        await SaveInDb(formData, selectedTemplate?.slug || '', aiResponse || '');
        setLoading(false);
    }

    const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress || '',
            createdAt: moment().format('DD/MM/YYYY'),
        });
    }

    return (
        <div className='p-4 md:p-10'>
            <Link href={"/dashboard"}>
                <Button><ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* form section */}
                <div className="col-span-1">
                    <FormSection 
                        selectedTemplate={selectedTemplate} 
                        userFormInput={(v: any) => GenerateAIContent(v)} 
                        loading={loading} 
                    />
                </div>
                {/* output section */}
                <div className='col-span-2 overflow-auto'>
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent
