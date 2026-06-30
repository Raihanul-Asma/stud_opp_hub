'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/MainLayout';
import api from '@/services/api';
import { Button } from '@/components/ui/button';

export default function OpportunityDetailsPage() {

    const { id } = useParams();

    const [opportunity, setOpportunity] = useState<any>(null);

    useEffect(() => {

        fetchOpportunity();

    }, []);

    const fetchOpportunity = async () => {

        try {

            const res = await api.get(`/opportunities/${id}`);

            setOpportunity(res.data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!opportunity) {

        return (
            <MainLayout>
                <h2 className="text-xl">Loading...</h2>
            </MainLayout>
        );

    }

    return (

        <MainLayout>

            <div className="max-w-4xl mx-auto space-y-6">

                <h1 className="text-4xl font-bold">
                    {opportunity.title}
                </h1>

                <h2 className="text-xl text-gray-500">
                    {opportunity.organization}
                </h2>

                <div>

                    <strong>Type</strong>

                    <p>{opportunity.type}</p>

                </div>

                <div>

                    <strong>Deadline</strong>

                    <p>{opportunity.deadline}</p>

                </div>

                <div>

                    <strong>Description</strong>

                    <p>{opportunity.description}</p>

                </div>

                <div>

                    <strong>Required Skills</strong>

                    <ul className="list-disc ml-6">

                        {opportunity.requiredSkills.map((skill: string) => (

                            <li key={skill}>{skill}</li>

                        ))}

                    </ul>

                </div>

                <Button asChild>

                    <a
                        href={opportunity.applyLink}
                        target="_blank"
                    >
                        Apply on Company Website
                    </a>

                </Button>

            </div>

        </MainLayout>

    );
}