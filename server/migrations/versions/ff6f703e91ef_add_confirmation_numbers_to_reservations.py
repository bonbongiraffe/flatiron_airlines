"""add confirmation numbers to reservations

Revision ID: ff6f703e91ef
Revises: a864cea7c84a
Create Date: 2023-08-22 22:02:09.875581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff6f703e91ef'
down_revision = 'a864cea7c84a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('conf_number', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservations', schema=None) as batch_op:
        batch_op.drop_column('conf_number')

    # ### end Alembic commands ###
