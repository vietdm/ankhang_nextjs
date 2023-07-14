import { SinglePage } from "@/components/ui/SinglePage";
import { useEffect, useState } from "react";
import { Wheel } from '../../public/assets/js/spin-wheel-esm';
import { Box, Button, Typography } from "@mui/material";
import { fetch } from "@/libraries/axios";
import { Alert } from "@/libraries/alert";

const propItems = [
    {
        label: 'AKG',
        alias: '10AKG',
        fullname: 'AKG',
        backgroundColor: '#a29bfe'
    },
    {
        label: 'Điểm video',
        alias: 'VD',
        fullname: 'Điểm thưởng video',
        backgroundColor: '#00cec9'
    },
    {
        label: 'Thẻ cào',
        alias: 'TDT',
        fullname: 'Thẻ điện thoại',
        backgroundColor: '#55efc4'
    },
    {
        label: '1 SP sữa',
        alias: 'SPS',
        fullname: '1 sản phẩm sữa',
        backgroundColor: '#fd79a8'
    },
    {
        label: 'Vé sức khỏe',
        alias: 'SK',
        fullname: 'Vé sức khỏe',
        backgroundColor: '#f3a683'
    },
    {
        label: 'Hộp tri thức',
        alias: 'TT',
        fullname: 'Hộp tri thức',
        backgroundColor: '#778beb'
    },
    {
        label: `Good luck`,
        alias: 'MM',
        fullname: 'Chúc may mắn lần sau',
        backgroundColor: '#63cdda'
    },
    {
        label: `Hộp bí mật`,
        alias: 'BM',
        fullname: 'Hộp bí mật',
        backgroundColor: '#f8a5c2'
    }
];

let eventId = 0;
let successGift: string | null = null;

const LuckyEventPage = () => {
    const [wheel, setWheel] = useState<any>(null);
    const [countWheel, setCountWheel] = useState<number>(0);
    const [requesting, setRequesting] = useState<boolean>(false);

    const reset = () => {
        eventId = 0;
        successGift = null;
    }

    const onWheelDone = (event: any) => {
        const indexGift = event.currentIndex;
        if (propItems[indexGift].alias == 'MM') {
            Alert.success(`${propItems[indexGift].fullname}!`)
        } else {
            Alert.success(`Chúc mừng bạn đã nhận được ${propItems[indexGift].fullname}!`);
        }
        fetch.post('random-lucky-event/update', { event_id: eventId, gift: successGift })
            .then(() => {
                setRequesting(false);
                reset();
                updateCountWheel();
            }).catch((error: any) => {
                Alert.error(error.message);
                setRequesting(false);
                reset();
                updateCountWheel();
            });
    };

    const updateCountWheel = () => {
        fetch.get('random-lucky-event').then((result: any) => setCountWheel(result.count));
    };

    const propConfig = {
        items: propItems,
        borderWidth: 0,
        image: '/imgs/lucky_whelll-min.png',
        overlayImage: '/imgs/lucky_whelll_point-min.png',
        isInteractive: false,
        itemLabelFont: 'Mulish',
        itemLabelFontSizeMax: 46,
        lineColor: '#353b48',
        lineWidth: 0,
        rotationSpeedMax: 1000,
        onRest: onWheelDone
    }

    useEffect(() => {
        const container = document.querySelector('#wheel-container');
        if (container == null) return;
        container.innerHTML = '';
        const newWheel = new Wheel(container, propConfig);
        setWheel(newWheel);
        updateCountWheel();
    }, []);

    const startRand = () => {
        setRequesting(true);
        fetch.post('random-lucky-event').then((result: any) => {
            const { gift, event_id } = result;
            const indexGift = propItems.findIndex((item: any) => item.alias == gift);
            eventId = event_id;
            successGift = gift;
            wheel.spinToItem(indexGift, 6000, true, 2, 1);
        }).catch((error: any) => {
            Alert.error(error.message);
            setRequesting(false);
        });
    }

    return (
        <SinglePage title="Vòng quay may mắn">
            <div id="wheel-container" style={{ width: "100%", height: '400px' }}></div>
            <Box paddingBottom={3}>
                <Typography component="h5" textAlign="center">Bạn còn <b>{countWheel}</b> lượt quay!</Typography>
            </Box>
            <Box>
                <Typography component="h6" fontWeight={700}>Ghi chú:</Typography>
                <ul style={{ paddingLeft: '32px' }}>
                    <li>
                        <Typography component="p">Good luck: Chúc may mắn lần sau</Typography>
                    </li>
                </ul>
            </Box>
            <Box textAlign="center" mt={2}>
                <Button variant="contained" onClick={startRand} disabled={requesting || countWheel <= 0}>Bắt đầu quay</Button>
            </Box>
        </SinglePage>
    );
}

export default LuckyEventPage;
