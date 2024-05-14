import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function JoinClubDialog({ clubName, averageStat, clubMaster }) {
    const handleJoinClick = () => {
        console.log('axios 출력 예정');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-16 h-7" variant="outline">
                    <p className="text-xs font-gmarketSansRegular">가입 신청</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {clubName}({averageStat})
                    </DialogTitle>
                    <DialogDescription>{clubMaster}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                            가입 신청
                        </Label>
                        <Input id="name" placeholder="소개를 작성해주세요." className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => handleJoinClick()}>
                        가입 신청하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default JoinClubDialog;
