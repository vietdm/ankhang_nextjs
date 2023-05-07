import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

export const MenuBottom = () => {
    return (
        <div id="Menu">
            <div className="Menu__list">
                <ul>
                    <li className="Menu__list--item active">
                        <a href="#">
                            <div className="icon">
                                <StoreOutlinedIcon />
                            </div>
                        </a>
                    </li>
                    <li className="Menu__list--item">
                        <a href="">
                            <div className="icon">
                                <AssignmentTurnedInOutlinedIcon />
                            </div>
                        </a>
                    </li>
                    <li className="Menu__list--item main ">
                        <a href="">
                            <div className="icon">
                                <HomeOutlinedIcon />
                            </div>
                        </a>
                    </li>

                    <li className="Menu__list--item">
                        <a href="">
                            <div className="icon">
                                <CardGiftcardOutlinedIcon />
                            </div>
                        </a>
                    </li>
                    <li className="Menu__list--item">
                        <a href="">
                            <div className="icon">
                                <PersonOutlineOutlinedIcon />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
