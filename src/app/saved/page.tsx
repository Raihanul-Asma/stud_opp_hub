'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import api from '@/services/api';
import { toast } from 'sonner';

export default function SavedPage() {

  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
        const res = await api.get('/saved');

        console.log(res.data);

        if (Array.isArray(res.data)) {
            setSaved(res.data);
        } else {
            setSaved([]);
        }

    } catch (error) {
        console.error(error);
    }
};

  const removeSaved = async (id: number) => {
    try {
      await api.delete(`/saved/${id}`);

      toast.success("Removed from saved");

      fetchSaved();

    } catch (error) {
      toast.error("Unable to remove");
    }
  };

  return (
    <MainLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          ❤️ Saved Opportunities
        </h1>

        {saved.length === 0 ? (

          <p className="text-gray-500">
            No saved opportunities.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {saved.map((item) => (

              <Card key={item.id}>

                <CardContent className="p-5">

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-gray-500">
                    {item.organization}
                  </p>

                  <p className="mt-2">
                    {item.description}
                  </p>

                  <Button
                    className="mt-4"
                    variant="destructive"
                    onClick={() => removeSaved(item.opportunityId)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Remove
                  </Button>

                </CardContent>

              </Card>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}