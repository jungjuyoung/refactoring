import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const FollowList = ({ header, data }) => {
  const ListStyle = useMemo(
    () => ({
      marginBottom: '20px',
    }),
    []
  );
  const ListGutterStyle = useMemo(
    () => ({ gutter: '4', xs: '2', md: '3' }),
    []
  );
  const divStyle = useMemo(
    () => ({ textAlign: 'center', margin: '10px 0' }),
    []
  );
  const ListItemStyle = useMemo(
    () => ({
      marginTop: '20px',
    }),
    []
  );

  return (
    <List
      style={ListStyle}
      grid={ListGutterStyle}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={divStyle}>
          <Button>더보기</Button>{' '}
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={ListItemStyle}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
