import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Icon,
  IconButton,
  Paragraph,
  Modal,
  Form,
  Loader,
  showToast,
  GridList,
  SettingCard,
} from '../../components';
import { AppStore } from '../../redux/store';
import { SectionService } from '../../services';
import { Section } from '../../models';

interface CustomizedState {
  isAdmin: boolean;
  menuId: number;
}

interface SectionProps {}

export const SectionScreen: React.FC<SectionProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState<any>(null);
  const menuState = useSelector((store: AppStore) => store.menu);
  const navigate = useNavigate();
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { isAdmin, menuId } = state;

  const getSections = async () => {
    setIsLoading(true);
    try {
      const sections = await SectionService.getSections(
        isAdmin ? menuState.id : menuId
      );
      setSections(sections);
    } catch (error) {
      showToast({ message: 'Error al cargar las secciones', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const createSection = async (values: Section) => {
    try {
      await SectionService.createSection({
        name: values.name,
        menuId: isAdmin ? menuState.id : menuId,
      });
      getSections();
      showToast({ message: 'Sección creada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al crear sección', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const updateSection = async (values: Section) => {
    try {
      await SectionService.updateSection(values.id, { name: values.name });
      getSections();
      showToast({ message: 'Sección actualizada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al actualizar sección', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const deleteSection = async (sectionId: number) => {
    try {
      await SectionService.deleteSection(sectionId);
      getSections();
      showToast({ message: 'Sección eliminada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al eliminar sección', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const buildForm = (item: any, action: (value: any) => Promise<void>) => {
    setShowModal(true);
    setForm(
      <Form
        inputs={[
          {
            label: 'Nombre',
            type: 'text',
            initialValue: { name: item.name || '' },
          },
        ]}
        onAction={(values: any) => action({ ...item, ...values })}
      />
    );
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', columnGap: 3, alignItems: 'baseline' }}>
          <Paragraph text={'Secciones'} variant="h3" />
          {isAdmin && (
            <IconButton
              icon={<Icon type="PLUS" sx={{ color: 'white' }} />}
              size="small"
              onClick={() => buildForm({}, createSection)}
              buttonStyle={{
                bgcolor: 'primary.main',
                ':hover': { bgcolor: 'primary.main' },
              }}
            />
          )}
        </Box>
        {isLoading ? (
          <Loader sx={{ py: 2 }} />
        ) : (
          <Box sx={{ my: 3 }}>
            <GridList
              items={sections}
              renderItem={(item: Section) => (
                <SectionCard
                  title={item.name}
                  disabledSettings={!isAdmin}
                  onClick={() =>
                    navigate(!isAdmin ? '/app/foods' : '/admin/foods', {
                      state: { section: item, isAdmin },
                    })
                  }
                  onUpdate={() => buildForm(item, updateSection)}
                  onDelete={() =>
                    showToast({
                      message: 'Esta seguro que quiere eliminar la sección?',
                      type: 'confirmation',
                      confirmOptions: {
                        confirm: {
                          onClick: () => deleteSection(item.id),
                          title: 'Eliminar',
                        },
                      },
                    })
                  }
                />
              )}
            />
          </Box>
        )}
      </Box>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Sección"
        fullWidth
      >
        {form}
      </Modal>
    </>
  );
};

interface SectionCardProps {
  title: string;
  imageUrl?: string;
  height?: string;
  onUpdate: () => void;
  onDelete: () => void;
  onClick: () => void;
  disabledSettings: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  imageUrl = 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  height = '160px',
  onUpdate,
  onDelete,
  onClick,
  disabledSettings,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [isOverSetting, setIsOverSetting] = useState<boolean>(false);

  const onMouseOver = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        if (!isOverSetting) {
          onClick();
        }
      }}
      sx={{
        position: 'relative',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height,
        padding: '20px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Paragraph
        text={title}
        variant="h6"
        fontSize={35}
        sx={{
          transition: 'transform 0.3s ease-in-out',
          ...(hover && {
            transform: 'scale(1.07)',
          }),
        }}
      />
      {!disabledSettings && (
        <SettingCard
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSettingOver={(over) => setIsOverSetting(over)}
        />
      )}
    </Box>
  );
};
