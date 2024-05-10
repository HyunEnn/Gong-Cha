import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SearchClub from '@/components/SearchClub';
import MyClub from '@/components/MyClub';

function ClubPage() {
    return (
        <div className="px-2 mt-4">
            <Tabs defaultValue="searchClub" className="w-[330px] mx-auto">
                <TabsList className="flex justify-around">
                    <TabsTrigger value="searchClub">클럽 둘러보기</TabsTrigger>
                    <TabsTrigger value="myClub">나의 클럽 보기</TabsTrigger>
                </TabsList>
                <TabsContent value="searchClub">
                    <SearchClub />
                </TabsContent>
                <TabsContent value="myClub">
                    <MyClub />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ClubPage;
