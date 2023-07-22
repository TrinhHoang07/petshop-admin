import { Modal, Button, Typography } from 'antd';

type T_Props = {
    description: string;
    setDescription: (open: string) => void;
};

function ModalDescription(props: T_Props) {
    return (
        <Modal
            open={!!props.description}
            onCancel={() => props.setDescription('')}
            footer={
                <Button type="primary" onClick={() => props.setDescription('')}>
                    Ok
                </Button>
            }
            title="Chi tiết sản phẩm"
        >
            <Typography.Paragraph>{props.description}</Typography.Paragraph>
        </Modal>
    );
}

export default ModalDescription;
