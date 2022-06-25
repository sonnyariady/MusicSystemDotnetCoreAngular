export class DropdownViewModel {
    FieldValue : string;
    FieldText : string;
}

export class DropdownActionModel extends DropdownViewModel
{
    ValidationType : number;
}

export class DropdownRoomModel extends DropdownViewModel
{
    BedCapacity : number;
    TotalOrang : number;
}

